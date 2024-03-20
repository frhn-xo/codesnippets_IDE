import axios from 'axios';

const languageIds = {
  cpp: 54,
  java: 62,
  javascript: 63,
  python: 71,
};

export const submitJudge0 = async (language, stdin, source_code) => {
  try {
    const languageId = languageIds[language];

    if (!languageId) {
      throw new Error('Unsupported language');
    }

    const requestBody = {
      source_code,
      language_id: languageId,
      stdin,
    };

    const options = {
      method: 'POST',
      url: process.env.JUDGE0_SUBMISSION,
      params: { base64_encoded: 'false', wait: 'false' },
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': process.env.JUDGE0_HOST,
        'X-RapidAPI-Key': process.env.JUDGE0_KEY,
      },
      data: requestBody,
    };

    // console.log('submitjudge0', options);

    const response = await axios.request(options);
    const token = response.data.token;

    const output = await checkStatus(token);
    return output;
  } catch (error) {
    console.error('Error submitting code to Judge0:', error);
    throw error;
  }
};

export const checkStatus = async (token) => {
  try {
    const options = {
      method: 'GET',
      url: `${process.env.JUDGE0_SUBMISSION}/${token}`,
      params: {
        base64_encoded: 'false',
        fields: 'stdout,status_id,language_id,stderr',
      },
      headers: {
        'X-RapidAPI-Host': process.env.JUDGE0_HOST,
        'X-RapidAPI-Key': process.env.JUDGE0_KEY,
      },
    };

    // console.log('checkstatus', options);

    const response = await axios.request(options);
    const { stdout, status_id, language_id, stderr } = response.data;

    if (status_id === 1 || status_id === 2) {
      console.log(
        'Submission is still in queue or processing. Waiting for 2 seconds...'
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return checkStatus(token);
    } else {
      console.log('stdout:', stdout);
      console.log('status_id:', status_id);
      console.log('language_id:', language_id);
      console.log('stderr:', stderr);
      return response.data;
    }
  } catch (err) {
    console.error('Error checking status:', err);
    throw err;
  }
};

import { connection } from '../dbs/index.js';
import { submitJudge0 } from '../utils/judge0.js';

export const addSnippet = async (req, res) => {
  try {
    const { username, language, stdin, source_code } = req.body;

    if (!username || !language || !source_code) {
      return res
        .status(400)
        .json({ message: 'Username, language, and source_code are required' });
    }

    const allowedLanguages = ['cpp', 'java', 'javascript', 'python'];
    if (!allowedLanguages.includes(language)) {
      return res.status(400).json({
        message:
          'Invalid language. Allowed values are cpp, java, javascript, python',
      });
    }

    const sanitizedStdin = stdin !== undefined ? stdin : null;

    const output = await submitJudge0(language, sanitizedStdin, source_code);
    res.status(201).json(output);

    // const sql = `INSERT INTO allsnippets (username, language, stdin, source_code) VALUES (?, ?, ?, ?)`;
    // await connection
    //   .promise()
    //   .execute(sql, [username, language, sanitizedStdin, source_code]);
    // res.status(201).json({
    //   message: 'Snippet added successfully',
    //   snippet: { username, language, stdin, source_code },
    // });
  } catch (error) {
    console.error('Error adding snippet:', error);
    res.status(500).json({ message: 'Error adding snippet' });
  }
};

export const getSnippets = async (req, res) => {
  try {
    const sql = `SELECT username, language, stdin, LEFT(source_code, 100) AS truncated_source_code, timestamp FROM allsnippets`;
    const [rows] = await connection.promise().query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

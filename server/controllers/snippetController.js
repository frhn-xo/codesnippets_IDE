import { connection, redis } from '../dbs/index.js';
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

    const output = await submitJudge0(language, stdin, source_code);

    const timestamp = new Date();

    console.log('output', output);
    const sanitizedStdin = stdin !== undefined ? stdin : null;
    console.log('sanitizedStdin', sanitizedStdin);

    const sql = `INSERT INTO allsnippets (username, language, stdin, source_code, output, timestamp) VALUES (?, ?, ?, ?, ?, ?)`;
    await connection
      .promise()
      .execute(sql, [
        username,
        language,
        sanitizedStdin,
        source_code,
        output,
        timestamp,
      ]);

    await redis.del('snippets');

    console.log(timestamp.toString(), timestamp);

    res.status(201).json({
      message: 'Snippet added successfully',
      snippet: { username, language, stdin, source_code, output, timestamp },
    });
  } catch (error) {
    console.error('Error adding snippet:', error);
    res.status(500).json({ message: 'Error adding snippet' });
  }
};

export const getSnippets = async (req, res) => {
  try {
    const cachedSnippets = await redis.get('snippets');
    if (cachedSnippets) {
      console.log('Cache hit');
      return res.status(200).json(cachedSnippets);
    } else {
      const sql = `SELECT id, username, language, stdin, LEFT(source_code, 100) AS truncated_source_code, output, timestamp FROM allsnippets ORDER BY id DESC`;
      const [rows] = await connection.promise().query(sql);

      await redis.set('snippets', JSON.stringify(rows));
      await redis.expire('snippets', 1800);
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

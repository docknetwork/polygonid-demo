import axios from 'axios';

const axiosHeaders = {
  headers: {
    'DOCK-API-TOKEN': process.env.DOCK_API_TOKEN,
  },
};

// basic structure of a credential claim request
const claimRequest = {
  schema: '',
  claims: ['id'],
  credentialOptions: {
    anchor: false,
    persist: false,
    emailMessage: '',
    credential: {},
    distribute: true
  }
};

const baseUrl = process.env.DOCK_API_URL;

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(400).json({});
    return;
  }

  try {
    // Create Credential Claim request
    const requestBody = {
      ...claimRequest,
      schema: req.body.schema,
      credentialOptions: {
        ...claimRequest.credentialOptions,
        credential: req.body
      }
    };
    console.log(requestBody);
    const credentialResponse = await axios.post(`${baseUrl}/credentials/request-claims`, requestBody, axiosHeaders);
    console.log(credentialResponse.data);

    res.json(credentialResponse.data);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};

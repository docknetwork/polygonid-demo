import React, { useState } from 'react';
import axios from 'axios';
import { getUnixTime } from 'date-fns/fp';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Here we're hard-coding a schema
// you can find sample schemas at https://github.com/iden3/claim-schema-vocab/blob/main/schemas/json
// or you can create a custom schema using the schema builder: https://certs.dock.io/schemas
const sampleSchema = {
  url: 'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v2.json',
  name: 'KYCAgeCredential',
  populateFunc(data) {
      // NOTE: the attributes returned here MUST match the schema
      return {
        birthday: getUnixTime(data.subject.dob),
        documentType: 3324
      };
    }
};

export default function Home() {
  const [issuerName, setIssuerName] = useState();
  const [issuerProfile, setIssuerProfile] = useState();
  const [credentialData, setCredentialData] = useState(
    {
      schema: sampleSchema.url,
      subject: {}
    });
  const [claimQR, setClaimQR] = useState('');

  async function handleGenerateProfileSubmit(e) {
    e.preventDefault();
    const { data } = await axios.post('api/create-did/', { issuerName });
    console.log(data);
    setIssuerProfile(data);
  }

  async function handleCreateCredentialRequest(e) {
    e.preventDefault();

    const credential = {
      schema: sampleSchema.url,
      issuer: issuerProfile.did,
      name: sampleSchema.name,
      type: ['VerifiableCredential', sampleSchema.name],
      subject: sampleSchema.populateFunc(credentialData)
    };

    const { data } = await axios.post('api/create-credential/', credential);
    console.log(data);
    setClaimQR(data.qrUrl);
  }

  if (!issuerProfile) {
    return (
      <>
        <div className="flex flex-col-reverse lg:flex-row lg:h-screen">
          <div
            className="lg:flex w-full lg:w-1/2 justify-around items-center text-center bg-zinc-900"
            style={{
              flexShrink: 0,
              background: 'url(/bg.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
            <div
              className="w-full mx-auto px-0 py-10 flex-col items-center space-y-6"
              style={{
                maxWidth: '400px',
                width: '100%',
              }}>
              <h1 className="text-white font-bold text-4xl">
                Dock  Polygon ID Demo
              </h1>

              <p className="text-white mt-1">
                In this interactive demo you will see how Dock&apos;s technology can be used to issue a
                Verifiable Credential with Polygon ID.
              </p>
              <br />
              <br />
            </div>
          </div>
          <div
            className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8"
            style={{ width: '100%' }}>
            <div className="w-full px-8 md:px-32 lg:px-24">
              <form
                onSubmit={handleGenerateProfileSubmit}
                className="p-5"
                style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h1 className="text-gray-800 font-bold text-2xl mb-6">Create a Polygon Issuer</h1>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <input
                    id="name"
                    className=" pl-2 w-full outline-none border-none"
                    name="name"
                    placeholder="Issuer Name"
                    value={issuerName}
                    onChange={(event) =>
                      setIssuerName(event.target.value)}
                  />
                </div>

                <button
                  disabled={!issuerName}
                  type="submit"
                  className="block w-full bg-blue-600 mt-5 py-2 rounded-full hover:bg-blue-700 hover:-translate-y-1 transition-all duration-250 text-white font-semibold mb-2">
                  Create
                </button>

              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!claimQR) {
    return (
      <>
        <div className="flex flex-col-reverse lg:flex-row lg:h-screen">
          <div
            className="lg:flex w-full lg:w-1/2 justify-around items-center text-center bg-zinc-900"
            style={{
              flexShrink: 0,
              background: 'url(/bg.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
            <div
              className="w-full mx-auto px-0 py-10 flex-col items-center space-y-6"
              style={{
                maxWidth: '400px',
                width: '100%',
              }}>
              <h1 className="text-white font-bold text-4xl">
                KYC Age Credential Example
              </h1>

              <p className="text-white mt-1">
                We&apos;ll issue a KYC Age Credential for which we need a birthdate.
              </p>
              <br />
              <br />
            </div>
          </div>
          <div
            className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8"
            style={{ width: '100%' }}>
            <div className="w-full px-8 md:px-32 lg:px-24">
              <form
                onSubmit={handleCreateCredentialRequest}
                className="p-5"
                style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h1 className="text-gray-800 font-bold text-2xl mb-6">Enter a date of birth</h1>
                <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                  <DatePicker
                    id="dob"
                    className=" pl-2 w-full outline-none border-none"
                    name="dob"
                    selected={credentialData.subject.dob}
                    onSelect={(date) => {
                      setCredentialData({
                        ...credentialData,
                        subject: {
                          ...credentialData.subject,
                          dob: date
                        }
                      });
                    }
                  }
                  />
                </div>

                <button
                  type="submit"
                  disabled={!credentialData.subject.dob}
                  className="block w-full bg-blue-600 mt-5 py-2 rounded-full hover:bg-blue-700 hover:-translate-y-1 transition-all duration-250 text-white font-semibold mb-2">
                  Create Credential Request
                </button>

              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

    return (
      <>
        <div className="flex flex-col-reverse lg:flex-row lg:h-screen">
          <div
            className="lg:flex w-full lg:w-1/2 justify-around items-center text-center bg-zinc-900"
            style={{
              flexShrink: 0,
              background: 'url(/bg.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}>
            <div
              className="w-full mx-auto px-0 py-10 flex-col items-center space-y-6"
              style={{
                maxWidth: '400px',
                width: '100%',
              }}>
              <h1 className="text-white font-bold text-4xl">
                Share the claim request link
              </h1>

              <p className="text-white mt-1">
                Share this link with the recipient. They will be presented with a QR code they can scan to begin the import
                flow in their Polygon ID wallet.
              </p>
              <br />
              <br />
            </div>
          </div>
          <div
            className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8"
            style={{ width: '100%' }}>
            <div className="w-full px-8 md:px-32 lg:px-24">
              <p className="font-bold text-4xl">
                Claim URL
              </p>

              <p>
                <br />
                <a href={claimQR} target='_blank' rel="noopener noreferrer">{claimQR}</a>
              </p>
              <br />
              <br />
            </div>
          </div>
        </div>
      </>

    );
}

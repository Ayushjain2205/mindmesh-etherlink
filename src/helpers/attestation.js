import { SignProtocolClient, SpMode, OffChainSignType } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

const privateKey = process.env.PRIVATE_KEY;
const client = new SignProtocolClient(SpMode.OffChain, {
  signType: OffChainSignType.EvmEip712,
  account: privateKeyToAccount(privateKey),
});

// Function to create an attestation
async function createAttestation(schemaId = "", data, indexingValue) {
  try {
    const attestationInfo = await client.createAttestation({
      schemaId,
      data,
      indexingValue,
    });
    return attestationInfo;
  } catch (error) {
    console.error("Error creating attestation:", error);
    throw error;
  }
}

// Function to revoke an attestation
async function revokeAttestation(attestationId, reason) {
  try {
    const result = await client.revokeAttestation(attestationId, {
      reason,
    });
    return result;
  } catch (error) {
    console.error("Error revoking attestation:", error);
    throw error;
  }
}

export { createSchema, createAttestation, revokeAttestation };

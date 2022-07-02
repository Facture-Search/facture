import { APIGatewayProxyResult } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";

import { getExtension } from "@facture/helpers";

export async function handleNoSize(fileName: string, coldBucket: string, s3: S3): Promise<APIGatewayProxyResult> {
    const fileExtension = getExtension(fileName);

    const uploaded = await s3.getObject({ Bucket: coldBucket, Key: fileName }).promise();

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/" + fileExtension, "Content-Disposition": `attachment; filename=${fileName}` },
        body: uploaded.Body?.toString("base64") || "",
        isBase64Encoded: true,
    };
}

export default handleNoSize;

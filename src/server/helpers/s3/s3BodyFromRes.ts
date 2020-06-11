import { GetObjectOutput } from "aws-sdk/clients/s3"

export const s3BodyFromRes = ({ Body }: GetObjectOutput) => Body!
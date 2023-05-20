import { FastifyHttpProxyOptions } from '@fastify/http-proxy';

export function GetGHGists(GHAccessToken: string | undefined) : FastifyHttpProxyOptions {
    return {
        upstream: 'https://api.github.com/users/antonpr1992/gists',
        prefix: 'ghgists', 
        httpMethods: ['GET'],
        replyOptions: {
            rewriteRequestHeaders: (origReq, headers) => {
                return {
                    ...headers,
                    authorization: `Bearer ${GHAccessToken}`
                }
            } 
        } 
    }
}


import  {RepoData}  from "./ReposDb";
import fastify, {RequestGenericInterface} from "fastify";
import fastifyHttpProxy from "@fastify/http-proxy";
import dotenv from 'dotenv';
import {GetGHProxySecureOptions, GetGHProxyOptions } from "./proxy";

import cors from '@fastify/cors';

dotenv.config();

const server = fastify()

let proxyOptsSecure = GetGHProxySecureOptions(process.env.GH_ACCESS_TOKEN)
server.register(fastifyHttpProxy, proxyOptsSecure)

let proxyOpts = GetGHProxyOptions()
server.register(fastifyHttpProxy, proxyOpts)

//setup CORS - this will be necessary for API requests from a VUE or any SPA app 
server.register(cors, {
    origin: "*"
})

server.get('/repos', async (request, reply) => {
  return RepoData;
})

//If you want to pass a parameter like /name/repo_name setup an interface
//for the parameter
interface requestId extends RequestGenericInterface {
    Params: {
      name: string
    }
}
//Now in the .get make sure you stereotype the request <requestId> and
//then you can get the parameter like in the second line with const
//thus /name/repo_name will pull repo_name out of the constant
server.get<requestId>('/repos/:name', async (request, reply) => {
    const { name } = request.params;
    const repo = RepoData.find(element => element.repo == name);
    if (repo) {
        return repo;
    } else {
        let errObj = {error: `The repository under name of ${name} was not found`};
        reply.code(404).send(errObj);
        return
    }
  })


//If you want to pass a parameter like /student/123 setup an interface
//for the parameter
interface requestQry extends RequestGenericInterface {
    Querystring: {
      name: string,
      repo_address: string
    }
}
//Now in the .get make sure you stereotype the request <requestId> and
//then you can get the parameter like in the second line with const
//thus /student/123 will pull 123 out of the constant
server.get<requestQry>('/search', async (request, reply) => {
    const { name,repo_address } = request.query;
    
    if (name){
        const repo = RepoData.find(element => element.repo == name);
        if (repo) {
            return [repo];
        } else {
            let errObj = {error: `The repository under name of ${name} was not found`};
            reply.code(404).send(errObj);
            return
        }
    }else if (repo_address){
        const repos = RepoData.filter(element => element.url == repo_address);
        if (repos.length > 0) {
            return repos;
        } else {
            let errObj = {error: `The repository with the address of ${repo_address} was not found`};
            reply.code(404).send(errObj);
            return
        }
    }else {
        let errObj = {error: "The /search API requires a repo name or URL query parameter"};
        reply.code(400).send(errObj);
        return
    }
  })

server.listen({ port: 9500 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
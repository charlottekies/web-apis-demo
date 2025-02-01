export default function Home() {
  return (
    <div className="lg:px-4 px-[10%] text-black space-y-5 top-0">
      <div className="lg:flex lg:flex-row lg:w-full text-[30px] font-semibold lg:flex-wrap gap-10">
        Welcome to the Library API Demo App!
      </div>
      <div className="lg:flex lg:flex-row lg:w-full text-lg lg:flex-wrap">
        Use the sidebar navigation to view lists of books and authors. Each page demonstrates how a React application can fetch data using different types of web APIs: REST, tRPC, and GraphQL.
      </div>
  
      <div className="lg:flex lg:flex-row lg:w-full text-[20px] font-semibold lg:flex-wrap">
        REST APIs
      </div>
      <div className="lg:flex lg:flex-row lg:w-full text-md lg:flex-wrap">
        A REST API, or Representational State Transfer API, is a software architectural style for designing web applications that use HTTP requests to communicate with web services.
        A REST API contains a collection of endpoints, each that return pre-defined data, for which each endpoint is named. 
        It is called "representational" because each endpoint represents a specific resource, both in its name and the structure of its data response.
        Notably, the response structure is fixed and generally does not change. 
        Interacting with REST Endpoints requires explicit use of HTTP Verbs (GET, PUT, PATCH, DELETE, POST...)
        And, error handling in REST APIs requires the frontend to explicitly manage different HTTP response status codes, such as handling failed requests or unexpected results, which adds more complexity to the flow.
      </div>
      <div className="lg:flex lg:flex-row lg:w-full text-[20px] font-semibold lg:flex-wrap">
        RPC APIs
      </div>
      <div className="lg:flex lg:flex-row lg:w-full text-md lg:flex-wrap">
        tRPC is a framework based on the Remote Procedure Call pattern, that doesn't expose traditional endpoints. Instead, when developing an RPC API, you define router procedures, which operate like functions. 
        Instead of requiring explicit use of HTTP Verbs, each procedure is defined as a mutation, query, or subscription type, which the framework computes as HTTP Verbs under the hood, so that the client doesn't have to.
        This abstraction allows the client to interact with the server without needing to worry about HTTP methods or response codes.
        By abstracting away much of the overhead, RPC reduces the amount of error-handling code on the frontend, making it easier to handle server interactions.
      </div>
      <div className="lg:flex lg:flex-row lg:w-full text-[20px] font-semibold lg:flex-wrap">
        GraphQL APIs
      </div>
      <div className="lg:flex lg:flex-row lg:w-full text-md lg:flex-wrap">
        A GraphQL API typically exposes just one endpoint. This endpoint accepts various types of operations not unlike those of an RPC API, including  queries, mutations, and subscriptions.
        The single endpoint accepts input written in the Graph Query Language. Because the endpoint accepts dynamically-typed queries, the response is therefore a dynamic data structure based on the specific request.
        So, in contrast to a REST endpoint, a GraphQL endpoint does not represent a single resource but multiple related resources, making it less "representational."
        Similar also to how RPC abstracts away much of the overhead, GraphQL APIs often do not require the frontend to handle HTTP status codes directly. Instead, errors are typically returned within the response payload (e.g., in an `errors` field).
      </div>
    </div>
  );
}

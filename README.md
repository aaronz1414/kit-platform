# Aaron's Notes

## Running the project

A docker-compose file has been added so that you can spin up all the
dependencies, including a postgres container and a migration job, with
`docker-compose up`.

## Examples of things I'd do with more time

-   Implement the remaining resolvers (I've added what I was imagining the
    remainder of the API to be as comments in the schema)
-   Add dataloader with a batch query for fetching the fields on the entity
    resolvers/type resolvers (so that if all articles were loaded along with
    their progress for example, that would only result in one batch query rather
    than many individual queries).
-   Add types to the resolvers with graphql-codegen.
-   Grab a value for the user from the headers (potentially authenticating
    against the login lib utils function, or in a real application the user
    profile might be resolved and forwarded along as a header from an upstream
    service) rather than hard-coding it into the context function.
-   Add pagination to myHistory

## Other Notes

-   The models/repository and inheritance structure of ContentProgress may be a
    little heavy for an application of this size, but I wanted to give an
    example of how I'd think about modularizing business logic and data access
    to manage complexity as the features of the application grow over time.

# Kit Platform (Take-Root Project)

Thank you for taking the time to interview with the Platform Squad at
BibleProject! In this project, you'll be presented with a fictional scenario for
an e-learning company and be asked to design and implement a software solution
for one of the company's new business initiatives. (The scenario is very similar
to one we actually face at BibleProject, but we've changed some of the details
to encourage you to feel free to be creative and not be overly constrained by
the work we've already done.)

## Scenario

Suppose you work for an e-learning SaaS company called _Kit_. Kit provides
corporate training for small and medium businesses around the world (90% of them
are in the United States). Employees of your corporate clients are assigned
training in the form of videos to watch, articles to read, and quizzes to fill
out, and your software platform provides on-demand access to these resources and
tracks user progress. Clients may supply their own videos and other resources,
or they may choose from a stock set of resources maintained by your company.

There are several teams at your company who work together to support the
product. Three in particular are relevant to this case study: (1) Content and
Integrations, who support curation of the content library as well as integrating
customer content into the system, (2) Web, who supports the frontend Web
application with which users interface, and (3) Platform, who supports the
application backend and infrastructure.

You are a software engineer on the Platform team, a squad that is growing and
taking on more responsibility as the organization looks to scale up, implement
innovative new training resources, and expand its global reach.

One of your team's projects for this quarter is to modernize the product's user
activity/progress tracking system. Currently the application is deployed as a
monolithic Web app which tracks a user's progress by maintaining a JSON file for
each user, an architecture which is problematic for several reasons.

Additionally, a new team is forming within your organization to create a mobile
version of the Web product, which will allow users to access training on a
smartphone or tablet, and it is a business requirement that user progress be
synchronized across platforms (Web, Android, iOS, etc.).

The goal is for the Platform team to create a backend User Activity service with
a GraphQL API so that the Web team can migrate their code and data to the new
GraphQL service, and so that any new mobile apps can use the same GraphQL API as
the Web and share a unified store of user data and progress.

For this exercise, you will implement one or more GraphQL services within an
Apollo Federation supergraph which provide an API for tracking users' activity
and progress on their corporate training.

For the sake of simplicity, assume that relationships between training material
(audio, video, interactive lessons, etc.) are flat - meaning you don't need to
deal with resources that contain other resources. A user has a relationship with
a resource. Your system tracks the progress of that relationship, including it's
progress, completion state, and whether the user has bookmarked the resource.

This repo represents scaffolding into which your new services should be written
(more details in the sections below).

Your focus should be on the GraphQL API, Node.js backend application layer, data
stores, and other distributed system components as needed. You need not provide
a fully production-worthy ready-to-deploy solution---use mocks and fakes as
appropriate---but you should provide working code for the most essential parts
of the application and be prepared to explain the proposed architecture in
depth. Our goal is for this endeavor to be a conversation, not an exam.

## Repository Setup

This is an [Nx](https://nx.dev/) monorepo with an
[Apollo Federation](https://www.apollographql.com/docs/federation/) federated
GraphQL API.

To get you started, the graph currently has three rudimentary services, which
can be found in the `apps/` folder:

-   `gateway`: An Apollo Gateway that serves as the router for the federated
    graph (note we are not using the newer Apollo Router yet)
-   `services/auth`: A subgraph for authentication concerns
-   `services/content`: A subgraph for training content concerns

There is also a library `libs/user-access` which stubs out user authentication
calls - in the real system this would make calls to a provider like Firebase,
but integrating with Firebase is not really the main point of this exercise, so
you should feel free to leave those calls stubbed out, although you may end up
needing to create some new API methods for the library to expand the user access
functionality.

You can run and experiment with the supergraph by installing the dependencies
(`npm i`; Node.js 20 is recommended) and executing the following commands in two
separate terminal windows (the Gateway is a bit of a prima dona and has to run
separately):

-   `cp .env.example .env` (**Don't skip this step!**)
-   `npm run start`
-   `npm run start:gateway`

Then navigate to http://localhost:6050 to query your supergraph.

Finding a better way to serve everything with a single command is left as an
exercise.

> **Heads up**: When you add a new service, you will need to update the
> `--projects` flag in the npm start command to include your new service.

## Task

**Your task is to build out one or more new subgraphs that handle User
Progress/User Activity concerns as described in the problem statement and
integrate them into the supergraph and monorepo structure.**

Considerations include but are not limited to: federated entities, backend data
stores, REST API data sources, user data handling, and performance and
reliability. You need not go as far as actually deploying third party resources
(e.g. AWS RDS instances) - use mocks and fakes as appropriate - but your code
should run and you should be prepared to describe how the production environment
would be architected and deployed. Stellar solutions to this problem may include
Docker Compose stacks or other locally emulated cloud resources.

## Development Notes

-   Nx regards the name of, say, the Auth service as `services-auth` (i.e.
    instead of just `auth` or `services/auth`).
-   A shortcut for creating a new subgraph service is to use the `@nrwl/express`
    generator to create a new service in `apps` like so:

    ```sh
    npx nx g @nrwl/express:app --directory services myservice
    ```

    This command is how the boilerplate for the existing services was created.

-   In a similar vein, the `user-access` library was created using:

    ```sh
    npx nx g @nrwl/node:lib
    ```

-   You may notice that this monorepo is on an older version of Nx. Upgrading
    the dependencies is allowed and even encouraged! Just be prepared to explain
    the changes.
-   If you notice caching issues you can run `npx nx reset` to clear the Nx
    cache.

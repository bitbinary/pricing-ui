This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduction

This app is created in NextJS which used React and NodeJs. The app follows the "App Folder" structure for the NextJs

The application has the feature to update a pricing profile which is predefined with id "pricing-profile-1"

Based on the requirements provided, there form fields can be updated, the updated are seen in real time and once the user have decided on the changes, they can go ahead and save the changes and continue working.

The live demo for the application is hosted in Vercel at : [Demo](https://pricing-p2firznhn-bitbinarys-projects.vercel.app/)

The Swagger Api documentation is available at : [Demo Documentation](https://pricing-p2firznhn-bitbinarys-projects.vercel.app/api-doc)

## Getting Started Locally

[Github Repo Link](https://github.com/bitbinary/pricing-ui)

1. Clone the project
2. Install the dependencies with

```bash
npm install
```

> **Note:** Node should be installed and available as a prerequisite. It is recommended to have Node version 20 or above.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Comments

- The Project used shadcn/ui for it's UI consistency.
- The Project used Tailwind CSS for styling
- The Project used PostgreSQL for database

## Future scope

- The work involved was minimal in regards to optimising it for the future uses. The use of NextJS server side rendering can be used for these kind of applications to make it run faster and also to optimise the performance. Especially since the actual product would need lot of data handling for the Products and filtering.

- The Future scope can also include loading state and other UI elements to make the user experience smoother

- The sample design provided had some design factors that I felt could have been modified. I have taken the liberty to update some on them without affecting the functionality directly. Although the current design might be a fruit a lot of discussion that I am not aware of. Also, since it was mentioned that, the design is just for reference, I have mainly used it as a reference on that is needed.

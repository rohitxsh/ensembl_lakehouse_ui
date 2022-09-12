- [Accessing Ensembl data with Presto and AWS Athena](#accessing-ensembl-data-with-presto-and-aws-athena)
  - [Goal (problem statement)](#goal-problem-statement)
- [Solution: Ensembl Data LakeHouse](#solution-ensembl-data-lakehouse)
    - [**Proposal: https://drive.google.com/file/d/1jzyWmgahCU13WUwUIyndQMi7twdsikie/view?usp=sharing**](#proposal-httpsdrivegooglecomfiled1jzywmgahcu13wuwuiyndqmi7twdsikieviewuspsharing)
    - [**Frontend: https://main.d1y7s04512fj06.amplifyapp.com/**](#frontend-httpsmaind1y7s04512fj06amplifyappcom)
    - [**Backend documentation: https://18.134.3.199/docs#/**](#backend-documentation-https181343199docs)
    - [**Frontend repo: https://github.com/rohitxsh/ensembl_lakehouse_ui**](#frontend-repo-httpsgithubcomrohitxshensembl_lakehouse_ui)
    - [**Backend repo: https://github.com/rohitxsh/ensembl_lakehouse**](#backend-repo-httpsgithubcomrohitxshensembl_lakehouse)
    - [**SQL to parquet python script repo: https://github.com/rohitxsh/sql2parquet_py**](#sql-to-parquet-python-script-repo-httpsgithubcomrohitxshsql2parquet_py)
  - [Summary](#summary)
  - [System design](#system-design)
  - [User journey](#user-journey)
  - [Sub-components](#sub-components)
  - [AWS](#aws)
  - [Achievements & optimisations](#achievements--optimisations)
  - [UI snapshots](#ui-snapshots)
  - [Future improvement suggestions/ideas](#future-improvement-suggestionsideas)

# Google Summer of Code 2021
# Accessing Ensembl data with Presto and AWS Athena
Contributor: Rohit Shrivastava
- Email: rohitxsh@gmail.com
- LinkedIn: [linkedin.com/in/rohitxsh/](https://www.linkedin.com/in/rohitxsh/)
- GitHub: [github.com/rohitxsh/](https://github.com/rohitxsh/)

Mentored by [Andy Yates](https://github.com/andrewyatz), [Bilal El Houdaigui](https://github.com/bilalebi) and [Marc Chakiachvili](https://github.com/marcoooo) from EMBL-EBI Ensembl

<br>

## Goal (problem statement)
The goal of this project was to build a NextGen replacement for the [BioMart](http://ensembl.org/biomart/martview/) tool that provides a way to download custom reports of genes, transcripts, proteins, and other data types. Considering the huge amount of data that needs to be dealt with in the area of genomic study, the current tool has very limited use cases because of scalability issues. The new tool will use the latest technologies available in the market such as AWS Athena (built on Presto), and Parquet/ORC to build a scalable solution.

<br>

# Solution: Ensembl Data LakeHouse

### **Proposal: https://drive.google.com/file/d/1jzyWmgahCU13WUwUIyndQMi7twdsikie/view?usp=sharing**

<br>

### **Frontend: https://main.d1y7s04512fj06.amplifyapp.com/**
### **Backend documentation: https://18.134.3.199/docs#/**

<br>

### **Frontend repo: https://github.com/rohitxsh/ensembl_lakehouse_ui**
### **Backend repo: https://github.com/rohitxsh/ensembl_lakehouse**
### **SQL to parquet python script repo: https://github.com/rohitxsh/sql2parquet_py**

<br>

## Summary
The focus of the end solution is to present full-stack software that can demonstrate the feasibility of the proposed system architecture to counter the scalability issues. The solution consists of a python script that migrates the genomic data from Ensembl's MySQL database to parquet files which are then stored on AWS S3. The backend system provides user-friendly isolation via Application Programming Interface over the AWS APIs to request required genomic data. The frontend allows users to interact with this system using a GUI to fetch the required genomic data for the desired datatype and species with appropriate filters.

<br>

## System design
![sql2parquet](./system-design/sql2parquet.png)
![ensembl_data_lakehouse](./system-design/ensembl_data_lakehouse.png)

<br>

## User journey
1. The user lands on https://main.d1y7s04512fj06.amplifyapp.com/ and selects the desired datatype.
2. The user selects the desired species.
3. The user builds the query by

   i. selecting the required fields to be retained in the result.

   ii. adding custom filers as required by selecting the "**+**" icon
4. User clicks on continue and reviews the query in the next step. The user optionally goes back to fix issues by selecting the Back button or resets the whole journey using the Reset button.
5. User submits the query and receives a query ID.
6. User selects on "Check query status" button and verifies if the status of the query is Done, otherwise wait until it's done.
7. User verifies the result via the Preview table and then downloads the result file in CSV format by pressing the Download button.
8. User then selects the "Export result" button.
9.  User lands on the export page and selects the desired file format.
10. User submits the request and keeps re-submitting until the status is Done.
11. User then downloads the file using the Download button and ends the journey.

<br>

## Sub-components
- [Python script to migrate genomic data from MySQL DB to parquet files (with added support to upload the files to AWS S3)](https://github.com/rohitxsh/sql2parquet_py)
  - The python script is responsible for exporting genomic data from the Ensembl MySQL database to parquet files. It writes the output, and parquet files to the defined S3 bucket.
  - Tech stack:
    - Python3
    - Boto3
    - pandas
  - Readme: [github.com/rohitxsh/sql2parquet_py/blob/main/README.md](https://github.com/rohitxsh/sql2parquet_py/blob/main/README.md)
  - Dependency: [TOML configuration file](https://github.com/rohitxsh/sql2parquet_py/blob/main/config.toml)
  - Tools:
    - Docker
  - Status: Deployed and ran successfully on an EC2 instance, parquet files uploaded to an AWS S3 bucket for human and mouse species

<br>

- [Ensembl's data lakehouse backend](https://github.com/rohitxsh/ensembl_lakehouse)
  - Readme (along with deployment details for Dockerfile): [github.com/rohitxsh/ensembl_lakehouse/blob/main/README.md](https://github.com/rohitxsh/ensembl_lakehouse/blob/main/README.md)
  - Tech stack: Python3, FastAPI, Celery, pandas, Boto3
  - Components
    - [API](https://github.com/rohitxsh/ensembl_lakehouse/blob/main/app/main.py):
      - The backend application is responsible for providing user-friendly APIs for external users to interact with the underlying AWS services in a controlled manner.
      - Dependencies:
        - Redis (used as a cache and database)
        - Self-signed SSL certificate
      - Tools:
        - [Docker](https://github.com/rohitxsh/ensembl_lakehouse/blob/main/Dockerfile.api)
        - [Nginx](https://github.com/rohitxsh/ensembl_lakehouse/blob/main/nginx.conf)
        - [Postman collections](https://github.com/rohitxsh/ensembl_lakehouse/blob/main/ensembl_lakehouse.postman_collection.json)

      - Status: Deployed on an EC2 instance at [18.134.3.199](https://18.134.3.199/). The EC2 instance is running a Docker container behind Nginx proxy.
    - [Celery worker](https://github.com/rohitxsh/ensembl_lakehouse/blob/main/app/tasks.py):
      - The celery worker machine is responsible for asynchronously polling and processing result file format export requests from the Celery message queue. This service helps to provide the result in different custom file formats as Athena only supports the CSV format for generating result files. Because of the high in-memory requirement for the tasks of this service, it is recommended to scale this service horizontally instead of scaling vertically. This can be achieved by adding more Celery worker machines. Based on the introspection, the recommended specification for worker machines are
        - RAM: 8 GB
        - CPU cores: 2 cores
      - Tech stack:
        - Python3
        - Celery
        - pandas
      - Dependency: Redis (used as a cache and database)
      - Tools:
        - [Docker](https://github.com/rohitxsh/ensembl_lakehouse/blob/main/Dockerfile.celery)
      - Status: Deployed on an EC2 instance

<br>

  - [Ensembl's data lakehouse frontend](https://github.com/rohitxsh/ensembl_lakehouse_ui)
    - Tech stack:
      - React 18
      - TypeScript
      - Material UI
      - Tailwind CSS
    - Readme: [github.com/rohitxsh/ensembl_lakehouse_ui/blob/main/README_react.md](https://github.com/rohitxsh/ensembl_lakehouse_ui/blob/main/README_react.md)
    - Status: Auto-deployed via AWS Amplify at [main.d1y7s04512fj06.amplifyapp.com](https://main.d1y7s04512fj06.amplifyapp.com/)

<br>

## AWS
Budget utilised: <50% (includes setup + testing)
<br>
Estimated monthly costs: ~ $125

### [AWS Athena](https://aws.amazon.com/athena/)

**Introduction**: Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL.

**Details with context**: AWS Athena is responsible for querying genomic data from the parquet files stored in AWS S3. Athena fetches the schema from AWS Glue to process the SQL queries.

**Dependencies**:
  - Parquet files in AWS S3
  - Meta schema of the parquet files stored in a DB by AWS Glue

### [AWS Glue](https://aws.amazon.com/glue/)

**Introduction**: Amazon Glue is a serverless data integration service that makes it easy to discover, prepare, and combine data for analytics, machine learning, and application development.

**Details with context**: AWS Glue **Crawler** is responsible for fetching the meta schema of the genomic data parquet files stored in AWS S3 and writing those details to a database to be used by AWS Athena.

### [AWS S3](https://aws.amazon.com/s3/)

**Introduction**: Amazon S3 is a object storage to store and retrieve any amount of data.

### [AWS ElastiCache](https://aws.amazon.com/elasticache/)

**Introduction**: Amazon ElastiCache is a fully managed, in-memory caching service with support for Redis and Memcached.

**Details with context**: AWS ElastiCache is being to provide a Redis instance which is being utilized both as a cache and a database for ex.: task status of celery worker machines, caching Athena query IDs, etc.

### [AWS Amplify](https://aws.amazon.com/amplify/)

**Introduction**: Amazon Amplify is a set of purpose-built tools and features that lets frontend web and mobile developers quickly and easily build full-stack applications on AWS, with the flexibility to leverage the breadth of AWS services.

**Details with context**: AWS Amplify is responsible for auto-deploying the frontend codebase without any additional tooling or configuration.

### [AWS EC2](https://aws.amazon.com/ec2/)

**Introduction**: Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable compute capacity in the cloud.

**Details with context**: AWS EC2 is being used as a virtual machine to run the backend servers. All EC2 machines for Ensembl data lakehouse are running on Ubuntu 22 base image.

<br>

## Achievements & optimisations
 - The output files from the python script are structured using **Hive style partitioning** where the top directory denotes the data type, and the sub-directory denotes the species, for example, the S3 URI for the gene of homo_sapiens will be *s3://ensembl-genome-data-parquet/gene/**species=homo_sapiens**/homo_sapiens_core_106_38-gene.parquet*. Hive style partitioning is supported by Athena, which helps to optimize the data querying process by limiting the number of parquet files to be referenced by Athena.
 - Athena treats each new/duplicate query as a separate request. It does retain the history of query IDs for a period of 45 days so identifying duplicate queries and reusing query IDs from the cache helps to reduce AWS costs as the system scales.
 - The system can be easily extended for more species and datatype as there are no hard-code dependencies which proves the system is also dynamic in nature and can be easily updated using configuration files to add more datatypes and species in the future.
 - In the frontend UI, the last successful query ID is cached in local storage and auto-populated on the status and export page.

<br>

## UI snapshots
![Home page 1](./ui-snapshots/home_1.png)
![Home page 2](./ui-snapshots/home_2.png)
![Home page 3](./ui-snapshots/home_3.png)
![Home page 4](./ui-snapshots/home_4.png)
![Status page](./ui-snapshots/status.png)
![Export page](./ui-snapshots/export.png)

<br>

## Future improvement suggestions/ideas

UI/UX improvements:
- Include query creation DateTime along with the status of the query ID.
- The filter fields on the query build step in UI should have proper validations and should not allow empty or invalid inputs
- Status page should also include a table that should automatically show the status of the last five query IDs along with other details such as creation DateTime, query submitted, etc. to help identify queries. This can be achieved using the browser’s local WebStorage
- Add option to store named queries to easily identify queries
- Allow users to auto-populate fields in query builder using older query IDs to help with cases when only small modifications are required.
- Auto-refresh status and export page until status is Done

Best practices:
  - Incorporate tests in the codebase for example unit tests

Scaling the system:
  - Add more species
  - Incorporate an alert and monitoring system

Analytics:
  - Use logs to identify common request patterns
  - Integrate privacy-focused web analytics tool in the frontend to identify areas of improvement based on common user patterns

<br>

## Deviations from solution proposal
- The current system only supports human and mouse species because loading the other mentioned species i.e. e.coli and SARS-CoV-2 had some limitations in terms of data accessibility and required manual intervention. These limitations can be easily removed in future by running the python script inside Ensembl network as E. coli and SARS-CoV-2's genomic data resides inside Ensembl intranet and therefore it wasn't accessible from outside internet. It was possible to load these data manually by loading the SQL dump to an external/local SQL server but these species were skippes as it wasn't affecting the goal that was to understand the feasibility and scalability of the proposed system architecture.

<br>

## Acknowledgement
I would like to thank Andy Yates, Bilal El Houdaigui, and Marc Chakiachvili for their constant support, invaluable learning, and guidance throughout my GSoC journey.

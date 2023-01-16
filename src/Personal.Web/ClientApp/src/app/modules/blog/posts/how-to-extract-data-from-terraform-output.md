You need to deploy changes to app service and database in your CD pipeline.
As part of your CD pipeline first you deploy changes to infrastructure and after that you update app service and run migrations against your database instance.
Assume that only terraform knows the details about infrastructure. And the only way to extract this information is by calling terraform output command.

In this post I show you how you can extract data from terraform output.

Let's say you have the following terraform output (JSON format)

```json
{
    "app_service": 
    {
        "name": "myapp",
        "fqdn": "myapp.azurewebsites.net"
    },
    "database": {
        "name": "example",
        "server_fqdn": "myserver.database.windows.net",
        "connection_string": "server=myserver.database.windows.net, initial catalog=example"
    },
    "application_insights_key": "12345"
}
```
For parsing JSON content you can use [jq](https://stedolan.github.io/jq/) tool

Here is how to extract fqdn value of app_service node:
```bash
terraform output -json | jq -r '.app_service.fqdn'
```
By using the same pattern you can extract the connection string of database:
```bash
terraform output -json | jq -r '.database.connection_string'
```
And you can repeat this for other properties as you need.

Next time I show you how to convert terraform output into Azure Devops variables.

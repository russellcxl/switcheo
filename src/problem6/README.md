# Transaction Broadcast Service (system design)

**Note: please refer to either the PDF or the JPG of the diagram; I uploaded 2 in case you can't open either one**

1. External service calls broadcast service using HTTP protocol. The header should contain an auth key which the service will then verify. If auth key is missing or invalid, return error 401 (unauthorized)

2. Once the request is made, the broadcast service will pass it through the rate-limiter. If the current RPS is exceeded, return error 500 (internal error) or 503 (unavailable)

3. If RPS is not exceeded, process the unsigned data and output signed data

4. The processor will then push the signed data into a message queue (RabbitMQ?). If the push is successful, the broadcast service will return http 200 to the client. A message queue will ensure that all client requests are eventually handled in case there is some processing delays downstream.

5. A consumer will then consume the message from the queue. If successfully consumed, it will insert a transaction into the DB with status = pending. The table should have a schema like this:

```sql
callback_cmd        varchar(255)
callback_payload    varchar(255)
transaction_id      varchar(255)
status              int
```
6. To elaborate on the table -- the `callback_cmd` is the RPC command, the `callback_payload` is the signed data that should be sent with the RPC request. `transaction_id` is for tracking/reference purposes. `status` indicates whether a transaction is waiting to be broadcasted (pending), has been successfully broadcasted (success), or has failed to be broadcasted even after the re-tries (fail)
7. The RPC request should be made with a retry policy (fixed intervals of 3 seconds). This is sufficient as the node responds in 1-2s 95% of the time. There will be 3 retry attempts with a timeout of 3 seconds. The failure rate will be 0.05^3 which is very, very low. RPC requests should also be idempotent as the retry policy may inadvertently make a request even after success
8. Outside the service itself. There will be an admin portal that reads from the DB and retrieves a list of transactions. Admins will be able to re-try the broadcast using a POST req. The RPC request will be made using the `callback_cmd` and `callback_payload`
9. There should also be a cronjob to check the DB for pending/failed transactions. This will ensure that no broadcasts are missed out
10. At the same time, the service should be connected to a monitoring (prometheus/grafana) and logging (zap?) service to measure the RPS and the error rates. Failed RPC requests should be logged as warn-level to prevent the system from raising too many alerts

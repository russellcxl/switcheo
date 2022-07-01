SELECT address

# first we get the balances of each account by summing the transactions in the
# balances table
FROM
     (
         SELECT address, sum(
                     amount *
                     (
                         CASE
                             WHEN denom = "usdc" THEN 0.000001
                             WHEN denom = "swth" THEN 0.00000005
                             ELSE 0.003
                             END
                         )
             ) as amt
         FROM balances
         GROUP BY address
    ) as tab1

# we then get the accounts with recent trades,
# and do an inner join;
# which will only select addresses that are present in both tables
INNER JOIN
    (
        SELECT DISTINCT address
        FROM trades
        WHERE block_height > 730000
    ) as tab2

ON tab1.address = tab2.address









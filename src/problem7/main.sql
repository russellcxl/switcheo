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
GROUP BY address;

SELECT DISTINCT address
FROM trades
WHERE block_height > 730000;





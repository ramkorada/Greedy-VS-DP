def greedy_coin_change(coins, amount):
    coins.sort(reverse=True)
    result = []

    for coin in coins:
        while amount >= coin:
            amount -= coin
            result.append(coin)

    return result


def dp_coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    if dp[amount] == float('inf'):
        return []

    result = []
    while amount > 0:
        for coin in coins:
            if amount - coin >= 0 and dp[amount] == dp[amount - coin] + 1:
                result.append(coin)
                amount -= coin
                break

    return result
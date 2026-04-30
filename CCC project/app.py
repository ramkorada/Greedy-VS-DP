from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__)

# Coin Change logic
def greedy_coin_change(coins, amount):
    coins.sort(reverse=True)
    result = []
    temp_amount = amount
    for coin in coins:
        while temp_amount >= coin:
            temp_amount -= coin
            result.append(coin)
    return result

def dp_coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    coin_used = [0] * (amount + 1)

    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                if dp[i - coin] + 1 < dp[i]:
                    dp[i] = dp[i - coin] + 1
                    coin_used[i] = coin

    if dp[amount] == float('inf'):
        return []

    result = []
    curr = amount
    while curr > 0:
        result.append(coin_used[curr])
        curr -= coin_used[curr]

    return result

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(".", path)

@app.route("/solve", methods=["POST"])
def solve():
    data = request.json
    try:
        amount = int(data.get("amount", 0))
    except ValueError:
        return jsonify({"error": "Invalid amount"}), 400
    
    # Default coins or take from input if provided
    coins = data.get("coins", [1, 2, 5, 10, 20, 50])
    if not isinstance(coins, list):
        coins = [1, 2, 5, 10, 20, 50]
    
    greedy = greedy_coin_change(coins, amount)
    dp = dp_coin_change(coins, amount)

    return jsonify({
        "greedy": greedy,
        "greedy_count": len(greedy),
        "dp": dp,
        "dp_count": len(dp)
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
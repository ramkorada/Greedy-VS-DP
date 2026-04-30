# Coin Change Algorithm Visualizer

## Overview
This project demonstrates the difference between Greedy Algorithms and Dynamic Programming using the Coin Change problem.

A simple web interface allows users to input an amount and view results computed using both approaches.

## Features
- Greedy Algorithm implementation
- Dynamic Programming implementation
- Web-based interface
- Real-time result display
- Minimal and clean architecture

## Technologies Used
- Python (Flask)
- HTML, CSS, JavaScript
- VS Code

## Project Structure
coin-change-web/
│── app.py          # Flask backend
│── main.py         # Algorithms
│── index.html      # Frontend UI
│── style.css       # Styling
│── script.js       # Frontend logic
│── README.md

## How to Run

1. Install dependencies:
   pip install flask

2. Run the backend:
   python app.py

3. Open index.html in browser

## Example

Input:
6

Output:
Greedy → 3 coins [4,1,1]  
DP → 2 coins [3,3]

## Conclusion
The project highlights that Greedy algorithms are fast but may not always produce optimal results, while Dynamic Programming guarantees the optimal solution.

## Author
Student Project Submission

document.getElementById("findBtn").addEventListener("click", async () => {
    const amount = document.getElementById("amountInput").value;
    const coinsStr = document.getElementById("coinsInput").value;
    
    if (!amount || isNaN(amount)) {
        alert("Please enter a valid amount");
        return;
    }

    const coins = coinsStr.split(',').map(c => parseInt(c.trim())).filter(c => !isNaN(c));

    const findBtn = document.getElementById("findBtn");
    findBtn.innerHTML = "<span>⏳</span> Processing...";
    findBtn.disabled = true;    try {
        const res = await fetch("/solve", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                amount: parseInt(amount),
                coins: coins
            })
        });

        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        // Update Visualizer Area with Compact Unified Comparison Dashboard
        const vizArea = document.getElementById("visualizerArea");
        const isOptimal = data.greedy_count === data.dp_count;

        vizArea.innerHTML = `
            <div class="animate" style="width: 100%; height: 100%; padding: 15px; display: flex; flex-direction: column; gap: 15px; justify-content: space-between;">
                
                <!-- COMPACT HEADER -->
                <div style="text-align: center;">
                    <h2 style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; margin-bottom: 5px;">
                        COMPARISON ANALYSIS
                    </h2>
                    <div style="display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-dim);">
                        TARGET: <span style="color: var(--primary); font-weight: 700;">${amount}</span> &nbsp;|&nbsp; COINS: <span style="color: var(--tertiary);">${coins.join(', ')}</span>
                    </div>
                </div>

                <!-- MAIN CARDS (COMPACT) -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; flex: 1; align-items: center;">
                    
                    <!-- DP OPTIMAL CARD -->
                    <div style="background: var(--surface); border: 2px solid var(--primary); border-radius: var(--radius); padding: 15px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 0 30px rgba(139, 92, 246, 0.1); position: relative;">
                        <div style="position: absolute; top: -10px; background: var(--primary); color: #fff; padding: 2px 10px; border-radius: 20px; font-size: 0.6rem; font-weight: 800; text-transform: uppercase;">Optimal</div>
                        <h3 style="font-family: var(--font-display); color: var(--primary); font-size: 0.7rem; letter-spacing: 1px; margin-bottom: 10px; text-transform: uppercase; font-weight: 700;">Dynamic Programming</h3>
                        
                        <div style="font-family: var(--font-display); font-size: 3rem; font-weight: 800; color: #fff; line-height: 1;">${data.dp_count}</div>
                        <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Coins</div>

                        <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 15px;">
                            ${data.dp.map(coin => `<div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: var(--font-display); border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 5px 10px -2px var(--primary-glow); font-size: 0.9rem;">${coin}</div>`).join('')}
                        </div>

                        <div style="width: 100%; padding-top: 10px; border-top: 1px solid var(--border); font-size: 0.8rem; color: var(--text-dim);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>Status:</span> <span style="color: var(--success); font-weight: 700;">Optimal</span></div>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span>Path:</span> <span style="font-family: var(--font-mono); color: var(--text); font-size: 0.7rem; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">${data.dp.join('→')}</span></div>
                        </div>
                    </div>

                    <!-- GREEDY CARD -->
                    <div style="background: var(--surface); border: 2px solid ${isOptimal ? 'var(--tertiary)' : 'var(--secondary)'}; border-radius: var(--radius); padding: 15px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 0 30px ${isOptimal ? 'rgba(6, 182, 212, 0.1)' : 'rgba(236, 72, 153, 0.1)'}; position: relative;">
                         <div style="position: absolute; top: -10px; background: ${isOptimal ? 'var(--tertiary)' : 'var(--secondary)'}; color: #fff; padding: 2px 10px; border-radius: 20px; font-size: 0.6rem; font-weight: 800; text-transform: uppercase;">Heuristic</div>
                        <h3 style="font-family: var(--font-display); color: ${isOptimal ? 'var(--tertiary)' : 'var(--secondary)'}; font-size: 0.7rem; letter-spacing: 1px; margin-bottom: 10px; text-transform: uppercase; font-weight: 700;">Greedy Algorithm</h3>
                        
                        <div style="font-family: var(--font-display); font-size: 3rem; font-weight: 800; color: #fff; line-height: 1;">${data.greedy_count}</div>
                        <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Coins</div>

                        <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 15px;">
                            ${data.greedy.map(coin => `<div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, ${isOptimal ? 'var(--tertiary)' : 'var(--secondary)'}, #444); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: var(--font-display); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 5px 10px -2px rgba(0,0,0,0.5); font-size: 0.9rem;">${coin}</div>`).join('')}
                        </div>

                        <div style="width: 100%; padding-top: 10px; border-top: 1px solid var(--border); font-size: 0.8rem; color: var(--text-dim);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>Status:</span> <span style="color: ${isOptimal ? 'var(--success)' : 'var(--secondary)'}; font-weight: 700;">${isOptimal ? 'Matched' : 'Sub-Optimal'}</span></div>
                            <div style="display: flex; justify-content: space-between; align-items: center;"><span>Path:</span> <span style="font-family: var(--font-mono); color: var(--text); font-size: 0.7rem; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">${data.greedy.join('→')}</span></div>
                        </div>
                    </div>

                </div>

                <!-- COMPACT VERDICT -->
                <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: var(--radius); padding: 10px 20px; text-align: center; border-left: 4px solid ${isOptimal ? 'var(--success)' : 'var(--secondary)'};">
                    ${isOptimal 
                        ? `<span style="color: var(--success); font-weight: 800; font-size: 0.8rem; text-transform: uppercase;">Efficiency: Perfect</span> &nbsp;|&nbsp; <span style="color: var(--text-dim); font-size: 0.8rem;">Both engines found the global minimum of ${data.dp_count} coins.</span>` 
                        : `<span style="color: var(--secondary); font-weight: 800; font-size: 0.8rem; text-transform: uppercase;">Efficiency Gap: ${data.greedy_count - data.dp_count} Coin(s)</span> &nbsp;|&nbsp; <span style="color: var(--text-dim); font-size: 0.8rem;">DP saved space by optimizing the token distribution.</span>`
                    }
                </div>
            </div>
        `;

        // Show Output Panel
        const outputBox = document.getElementById("outputBox");
        outputBox.classList.remove("hidden");
        outputBox.style.display = "block";

    } catch (err) {
        console.error(err);
        alert("Error connecting to Engine");
    } finally {
        findBtn.innerHTML = "<span>🚀</span> Run Visualization";
        findBtn.disabled = false;
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("amountInput").value = "43";
    document.getElementById("outputBox").classList.add("hidden");
    document.getElementById("outputBox").style.display = "none";
    document.getElementById("visualizerArea").innerHTML = `
        <div style="text-align: center; max-width: 400px;">
            <h2 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 12px; opacity: 0.9;">Awaiting Input</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Configure your parameters in the sidebar to visualize the coin distribution algorithms.</p>
        </div>
    `;
});
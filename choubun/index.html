document.addEventListener('DOMContentLoaded', () => {
    const problemTextDisplay = document.getElementById('problem-text');
    const inputArea = document.getElementById('input-area');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start-btn');
    const finishButton = document.getElementById('finish-btn');
    const resetButton = document.getElementById('reset-btn');
    const charCountDisplay = document.getElementById('char-count');
    const resultModal = document.getElementById('result-modal');
    const resultDetails = document.getElementById('result-details');
    const closeModalBtn = document.getElementById('close-modal');
    const problemDropdown = document.getElementById('problem-dropdown');
    const modeRandomBtn = document.getElementById('mode-random');
    const modeSelectBtn = document.getElementById('mode-select');

    let currentProblem = null;
    let timerInterval = null;
    let timeLeft = 600;
    let isRunning = false;
    let selectedMode = 'random';

    // --- ドロップダウン初期化 ---
    problems.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.title;
        problemDropdown.appendChild(opt);
    });

    // --- モード切替 ---
    function updateModeUI() {
        if (selectedMode === 'random') {
            modeRandomBtn.classList.add('active');
            modeSelectBtn.classList.remove('active');
            problemDropdown.style.display = 'none';
            problemTextDisplay.textContent = "スタートボタンを押すとランダムに問題が出題されます。";
        } else {
            modeSelectBtn.classList.add('active');
            modeRandomBtn.classList.remove('active');
            problemDropdown.style.display = 'inline-block';
            const prob = problems.find(p => p.id == problemDropdown.value);
            problemTextDisplay.textContent = prob ? prob.text : "";
        }
    }

    modeRandomBtn.addEventListener('click', () => { if(!isRunning) { selectedMode = 'random'; updateModeUI(); } });
    modeSelectBtn.addEventListener('click', () => { if(!isRunning) { selectedMode = 'select'; updateModeUI(); } });
    problemDropdown.addEventListener('change', () => { if (selectedMode === 'select') { const prob = problems.find(p => p.id == problemDropdown.value); problemTextDisplay.textContent = prob ? prob.text : ""; } });

    // --- コピー禁止 ---
    const preventActions = (e) => { e.preventDefault(); return false; };
    problemTextDisplay.addEventListener('contextmenu', preventActions);
    problemTextDisplay.addEventListener('copy', preventActions);
    problemTextDisplay.addEventListener('dragstart', preventActions);
    inputArea.addEventListener('paste', (e) => { e.preventDefault(); alert("貼り付けは禁止されています。"); });

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (isRunning) return;
        if (selectedMode === 'random') {
            currentProblem = problems[Math.floor(Math.random() * problems.length)];
        } else {
            currentProblem = problems.find(p => p.id == problemDropdown.value);
        }
        problemTextDisplay.textContent = currentProblem.text;
        inputArea.value = "";
        inputArea.disabled = false;
        inputArea.focus();
        startButton.disabled = true;
        finishButton.disabled = false;
        problemDropdown.disabled = true;
        modeRandomBtn.style.opacity = 0.5;
        modeSelectBtn.style.opacity = 0.5;
        timeLeft = 600;
        timerDisplay.textContent = formatTime(timeLeft);
        isRunning = true;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);
            if (timeLeft <= 0) finishExam();
        }, 1000);
    }

    function finishExam() {
        clearInterval(timerInterval);
        isRunning = false;
        inputArea.disabled = true;
        finishButton.disabled = true;
        startButton.disabled = false;
        problemDropdown.disabled = false;
        modeRandomBtn.style.opacity = 1;
        modeSelectBtn.style.opacity = 1;
        const inputText = inputArea.value;
        const targetText = currentProblem.text;
        const timeSpent = 600 - timeLeft;
        const result = calculateErrors(inputText, targetText);
        
        const multiplier = timeSpent > 0 ? (600 / timeSpent) : 0;
        const estChars = Math.round(inputText.length * multiplier);
        const estErrors = Math.round(result.distance * multiplier);

        // ミス減点ロジック (最初のコードの基準)
        let penalty = estChars >= 600 ? 5 : (estChars >= 400 ? 3 : 1);
        let netScore = estChars - (estErrors * penalty);
        let grade = getGrade(netScore);

        resultDetails.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:20px; background:var(--bg-color); padding:15px; border-radius:4px;">
                <span>実入力: ${inputText.length}字</span>
                <span>ミス: ${result.distance}箇所</span>
            </div>
            <div style="text-align:center; margin-bottom:20px;">
                <div style="font-size:0.9rem; color:var(--sub-color);">判定ランク</div>
                <div style="font-size:2.5rem; color:var(--main-color); font-weight:bold;">${grade}</div>
                <div style="color:var(--sub-color);">(10分換算正味得点: ${netScore}点)</div>
            </div>
            <div class="error-report">${result.html}</div>
        `;
        resultModal.style.display = 'flex';
    }

    function resetAll() {
        clearInterval(timerInterval);
        isRunning = false;
        timeLeft = 600;
        timerDisplay.textContent = "10:00";
        inputArea.value = "";
        inputArea.disabled = true;
        charCountDisplay.textContent = "文字数: 0";
        startButton.disabled = false;
        finishButton.disabled = true;
        problemDropdown.disabled = false;
        modeRandomBtn.style.opacity = 1;
        modeSelectBtn.style.opacity = 1;
        resultModal.style.display = 'none';
        updateModeUI();
    }

    function calculateErrors(s1, s2) {
        const m = s1.length, n = Math.min(s2.length, s1.length + 50);
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (s1[i-1] === s2[j-1]) dp[i][j] = dp[i-1][j-1];
                else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
            }
        }
        let minDist = dp[m][0], bestJ = 0;
        for (let j = 1; j <= n; j++) { if (dp[m][j] < minDist) { minDist = dp[m][j]; bestJ = j; } }
        let i = m, j = bestJ, res = [];
        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && s1[i-1] === s2[j-1] && dp[i][j] === dp[i-1][j-1]) { res.unshift(s1[i-1]); i--; j--; }
            else if (i > 0 && j > 0 && dp[i][j] === dp[i-1][j-1] + 1) { res.unshift(`<span class="error-char">${s1[i-1]}</span>`); i--; j--; }
            else if (i > 0 && dp[i][j] === dp[i-1][j] + 1) { res.unshift(`<span class="error-char">${s1[i-1]}</span>`); i--; }
            else if (j > 0 && dp[i][j] === dp[i][j-1] + 1) { res.unshift(`<span class="error-char">[抜]</span>`); j--; }
            else { if (i > 0) { res.unshift(`<span class="error-char">${s1[i-1]}</span>`); i--; } else if (j > 0) { res.unshift(`<span class="error-char">[抜]</span>`); j--; } }
        }
        return { distance: minDist, html: res.join('').replace(/\n/g, '<br>') };
    }

    // --- 判定ロジック (最初のコードの基準を反映) ---
    function getGrade(score) {
        if (score >= 3000) return "十段";
        if (score >= 2750) return "九段";
        if (score >= 2500) return "八段";
        if (score >= 2250) return "七段";
        if (score >= 2000) return "六段";
        if (score >= 1750) return "五段";
        if (score >= 1500) return "四段";
        if (score >= 1250) return "三段";
        if (score >= 1000) return "二段";
        if (score >= 800) return "初段";
        if (score >= 700) return "1級";
        if (score >= 600) return "準1級";
        if (score >= 500) return "2級";
        if (score >= 400) return "準2級";
        if (score >= 300) return "3級";
        if (score >= 200) return "4級";
        return "不合格";
    }

    inputArea.addEventListener('input', () => { charCountDisplay.textContent = `文字数: ${inputArea.value.length}`; });
    startButton.addEventListener('click', startTimer);
    finishButton.addEventListener('click', finishExam);
    resetButton.addEventListener('click', resetAll);
    closeModalBtn.addEventListener('click', () => { resultModal.style.display = 'none'; });
    document.getElementById('show-grades-btn').addEventListener('click', () => { document.getElementById('grading-modal').style.display = 'flex'; });
    document.getElementById('close-grading-modal').addEventListener('click', () => { document.getElementById('grading-modal').style.display = 'none'; });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !isRunning && document.activeElement !== inputArea) { e.preventDefault(); startButton.click(); }
        if (e.code === 'Space' && e.shiftKey && isRunning) { e.preventDefault(); finishButton.click(); }
        if (e.code === 'Escape') resetAll();
    });
    updateModeUI();
});

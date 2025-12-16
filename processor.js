// 读取五个题目的回答并保存到内存与 localStorage，同时在页面显示
document.addEventListener('DOMContentLoaded', () => {
    // 获取页面元素（与 test.html 中的 id 对应）
    const textInput = document.getElementById('textInput'); // 额外文本输入
    const q1 = document.getElementById('Q1'); // 问题1 文本
    const q2 = document.getElementById('Q2'); // 问题2 文本
    const radios = document.getElementsByName('option'); // 问题3 单选组
    const q4 = document.getElementById('Q4'); // 问题4 文本
    const selectEl = document.getElementById('mySelect'); // 问题5 下拉
    const readBtn = document.getElementById('readBtn'); // 提交按钮
    const resultEl = document.getElementById('result'); // 结果显示容器（可选）

    // 本地存储的 key（持久化位置）
    const STORAGE_KEY = 'goldenglow_answers';

    // answers 为内存对象，页面运行期间可直接读取
    let answers = {};

    // 尝试从 localStorage 恢复之前保存的答案（如果有）
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) answers = JSON.parse(saved);
    } catch (e) {
        console.warn('无法读取 localStorage：', e);
    }

    // 如果 localStorage 中已有值，尝试把它填回到表单（提高 UX）
    if (answers.Q1 && q1) q1.value = answers.Q1;
    if (answers.Q2 && q2) q2.value = answers.Q2;
    if (answers.Q4 && q4) q4.value = answers.Q4;
    if (answers.Q5 && selectEl) selectEl.value = answers.Q5;
    if (answers.Q3 && radios) {
        for (const r of radios) if (r.value === answers.Q3) r.checked = true;
    }

    // 如果没有提交按钮，直接不绑定事件
    if (!readBtn) return;

    // 绑定点击事件：读取所有问题的当前值、保存并显示
    readBtn.addEventListener('click', () => {
        const valText = textInput ? textInput.value.trim() : '';
        const valQ1 = q1 ? q1.value.trim() : '';
        const valQ2 = q2 ? q2.value.trim() : '';
        const checkedRadio = document.querySelector('input[name="option"]:checked');
        const valQ3 = checkedRadio ? checkedRadio.value : null;
        const valQ4 = q4 ? q4.value.trim() : '';
        const valQ5 = selectEl ? selectEl.value : '';

        // 构建答案对象（内存）
        answers = {
            text: valText,
            Q1: valQ1,
            Q2: valQ2,
            Q3: valQ3,
            Q4: valQ4,
            Q5: valQ5,
            savedAt: new Date().toISOString()
        };

        // 写入 localStorage（持久化），浏览器会把它保存到本地磁盘
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
        } catch (e) {
            console.warn('保存到 localStorage 失败：', e);
        }

        if (answers.Q5 != "Cat")
        {
            alert("You!!!!!");
        }
        else
        {
            const Score = (answers.Q1 === "1/7" ? 20 : 0) + (answers.Q2 === "Susie Glitter" || answers.Q2 === "Susie" ? 20 : 0) + 
            (answers.Q3 === "2" ? 20 : 0) + (answers.Q4 == "159" || answers.Q4 === "159cm" ? 20 : 0) + (answers.Q5 === "Cat" ? 20 : 0);
            let output = "Hello, "+ (answers.text || 'Guest') + "!\n\n" + "You've got " + Score + " out of 100!\n\n";
            if (Score >= 80)
            {
                output += ":D";
            }
            else
            {
                output += ":(";
            }
            alert(output);
        }
        // 在页面中显示结果（替代 alert），如果没有 result 元素则退回到 alert

    });
});


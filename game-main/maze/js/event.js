document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector("#maze");
    const movableElement = document.querySelector("#player");
    const walls = document.querySelectorAll(".wall");

    const step = 20;
    let isMoving = false;

    document.addEventListener("keydown",  function (e) {
        if (isMoving) return;
        const playerRect = movableElement.getBoundingClientRect();
        let newX = playerRect.left - container.getBoundingClientRect().left;
        let newY = playerRect.top - container.getBoundingClientRect().top;
        let top = movableElement.getBoundingClientRect().top;
        let left = movableElement.getBoundingClientRect().left;
        isMoving = true;

        switch (e.key) {
            case "ArrowUp":
                newY = Math.max(newY - step, 0);
                top = top - step;
                break;
            case "ArrowDown":
                newY = Math.min(newY + step, container.clientHeight - playerRect.height);
                top = top + step;
                break;
            case "ArrowLeft":
                newX = Math.max(newX - step, 0);
                left = left - step;
                break;
            case "ArrowRight":
                newX = Math.min(newX + step, container.clientWidth - playerRect.width);
                left = left + step;
                break;
        }

        if (!checkCollision(top, left)) {
            movableElement.style.transform = `translate(${newX}px, ${newY}px)`;
        }
        setTimeout(() => {
            isMoving = false;
        }, 150); // 일정 시간(예: 150ms) 아니면 이벤트가 연속으로 발생해서 벽통과함
    });

    function checkCollision(x, y) {
        let isCollision = false;
        walls.forEach(wall => {
            const wallRect = wall.getBoundingClientRect();
            if ( x ==  wallRect.top &&
                y ==  wallRect.left) {
                isCollision = true;
            }
        });

        return isCollision;
    }
});
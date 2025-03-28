// Thêm sự kiện cảm ứng cho các thiết bị di động
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của trình duyệt

    // Lấy tọa độ điểm chạm
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của trình duyệt

    let touchMoveX = e.touches[0].clientX;
    let touchMoveY = e.touches[0].clientY;

    let diffX = touchMoveX - touchStartX;
    let diffY = touchMoveY - touchStartY;

    // Di chuyển theo hướng chạm
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Chạm ngang
        if (diffX > 0 && snake.direction !== 'left') {
            snake.direction = 'right';
        } else if (diffX < 0 && snake.direction !== 'right') {
            snake.direction = 'left';
        }
    } else {
        // Chạm dọc
        if (diffY > 0 && snake.direction !== 'up') {
            snake.direction = 'down';
        } else if (diffY < 0 && snake.direction !== 'down') {
            snake.direction = 'up';
        }
    }

    // Cập nhật lại điểm chạm bắt đầu để lần chạm tiếp theo
    touchStartX = touchMoveX;
    touchStartY = touchMoveY;
});

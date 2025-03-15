def game_loop():
    while running:
        # 输入处理
        for event in pygame.event.get():
            if event.type == KEYDOWN:
                if event.key == K_LEFT:  move(-1)
                elif event.key == K_RIGHT: move(1)
                elif event.key == K_UP: rotate()
        
        # 自动下落
        if time.time() - last_fall > fall_interval:
            move_down()
        
        # 消除检测
        lines = 0
        for i, row in enumerate(grid):
            if all(row):
                del grid[i]
                grid.insert(0, [0]*10)
                lines += 1
        # 计分规则：消除行数^2 * 100
        score += lines**2 * 100
        
        # 渲染逻辑
        draw_grid()
        draw_piece()
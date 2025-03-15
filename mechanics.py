def check_collision(grid, piece):
    """使用包围盒检测碰撞"""
    shape = piece['shape']
    x, y = piece['position']
    for i in range(len(shape)):
        for j in range(len(shape[0])):
            if shape[i][j]:
                if x+j < 0 or x+j >= 10 or y+i >= 20:
                    return True
                if y+i >=0 and grid[y+i][x+j]:
                    return True
    return False

def rotate_piece(piece):
    """矩阵旋转算法"""
    return {
        'shape': [list(row) for row in zip(*piece['shape'][::-1])],
        'position': piece['position']
    }
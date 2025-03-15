class Tetris:
    def __init__(self):
        # 游戏区域 20行x10列
        self.grid = [[0]*10 for _ in range(20)]  
        self.current_piece = None
        self.score = 0

    def spawn_piece(self):
        # 7种经典方块形状（I,O,T,S,Z,J,L）
        shapes = [
            [[1,1,1,1]],          # I
            [[1,1],[1,1]],        # O
            [[0,1,0],[1,1,1]],    # T
            # ... 其他形状定义
        ]
        self.current_piece = {
            'shape': random.choice(shapes),
            'position': [4, 0]  # 初始生成位置
        }
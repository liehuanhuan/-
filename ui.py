def draw_particle_effect():
    """行消除时的粒子特效"""
    for _ in range(50):
        pos = [x*10 + random.randint(-5,5) for x in eliminated_row]
        particles.append(Particle(pos))

def play_sound(effect):
    """音效管理系统"""
    channel = pygame.mixer.find_channel()
    channel.play(sound_library[effect])
const collideTop = b => {
  return b.position.y < 0;
};

const collideBottom = b => {
  return b.position.y > HEIGHT - b.h;
};

const collideLeft = b => {
  return b.position.x < 0;
};

const collideRight = b => {
  return b.position.x  > WIDTH - b.w;
};

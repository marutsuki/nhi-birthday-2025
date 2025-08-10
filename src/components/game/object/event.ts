export class BossDefeatedEvent extends Event {
  static readonly type = "boss-defeated";
  constructor(public bossLocation: { x: number; y: number }) {
    super(BossDefeatedEvent.type);
  }
}

export class FinishHimEvent extends Event {
  static readonly type = "finish-him";
  constructor(
    public bossLocation: { x: number; y: number },
    public playerLocation: { x: number; y: number }
  ) {
    super(FinishHimEvent.type);
  }
}

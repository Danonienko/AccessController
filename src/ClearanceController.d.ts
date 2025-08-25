declare interface IClearanceController {
	GetPlayerClearanceLevel(player: Player): number;
	GetPlayerKeyCards(player: Player): KeyCard[];

	GetGatekeeperClearanceLevel(gatekeeper: Gatekeeper): number;
	GetGatekeeperKeyCards(gatekeeper: Gatekeeper): string[];

	PlayerHasClearance(player: Player, gatekeeper: Gatekeeper): boolean;

	IsAKeyCard(tool: unknown): tool is KeyCard;
	IsAGatekeeper(instance: unknown): instance is Gatekeeper;
}

declare type KeyCardConfig = Configuration & {
	Level: NumberValue;
};

declare type GatekeeperConfig = Configuration & {
	Clearance: NumberValue;
	KeyCards: Folder;
};

declare type KeyCard = Tool & {
	KeyCardConfig: KeyCardConfig;
};

declare type Gatekeeper = Instance & {
	GatekeeperConfig: GatekeeperConfig;
};

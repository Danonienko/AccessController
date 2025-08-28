declare type KeyCard = Tool & {
	KeyCardConfig: KeyCardConfig;
};

declare type KeyCardConfig = Configuration & {
	Level: NumberValue;
};

declare type Gatekeeper = Instance & {
	GatekeeperConfig: GatekeeperConfig;
};

declare type GatekeeperConfig = Configuration & {
	Clearance: NumberValue;
	KeyCards: Folder;
};

declare type KeyCardConfig = Configuration & {
	Level: NumberValue;
	LockDownBypass: BoolValue;
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

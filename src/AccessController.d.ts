declare type KeyCard = Tool & {
	KeyCardConfig: Configuration & {
		Level: NumberValue;
		LockDownBypass: BoolValue;
	};
};

declare type Gatekeeper = Instance & {
	GatekeeperConfig: Configuration & {
		Open: BoolValue;
		LockDown: BoolValue;
		Jammed: BoolValue;
		Clearance: NumberValue;
		KeyCards: Folder;
	};
};

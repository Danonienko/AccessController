import { t } from "@rbxts/t";

export default {
	KeyCardValidator: t.intersection(
		t.instanceIsA("Tool"),
		t.interface({
			KeyCardConfig: t.intersection(
				t.instanceIsA("Configuration"),
				t.interface({
					Level: t.instanceIsA("NumberValue"),
					LockDownBypass: t.instanceIsA("BoolValue"),
				})
			),
		})
	),

	GatekeeperValidator: t.intersection(
		t.instanceIsA("Instance"),
		t.interface({
			GatekeeperConfig: t.intersection(
				t.instanceIsA("Configuration"),
				t.interface({
					Clearance: t.instanceIsA("NumberValue"),
					KeyCards: t.instanceIsA("Folder"),
				})
			),
		})
	),
} as const;

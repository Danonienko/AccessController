import { t } from "@rbxts/t";

export default {
	KeyCardValidator: t.intersection(
		t.instanceIsA("Tool"),
		t.children({
			KeyCardConfig: t.intersection(
				t.instanceIsA("Configuration"),
				t.children({
					Level: t.instanceIsA("NumberValue"),
				})
			),
		})
	),

	GatekeeperValidator: t.children({
		GatekeeperConfig: t.intersection(
			t.instanceIsA("Configuration"),
			t.children({
				Clearance: t.instanceIsA("NumberValue"),
				KeyCards: t.instanceIsA("Folder"),
			})
		),
	}),
} as const;

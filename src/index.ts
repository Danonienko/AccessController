import { t } from "@rbxts/t";
import Constants from "./Constants";
import Validators from "./Validators";

export default abstract class ClearanceController {
	protected static _getPlayerBackpackContents(player: Player): Instance[] {
		return player.FindFirstChildOfClass("Backpack")?.GetChildren() ?? [];
	}

	public static IsAKeyCard(tool: unknown): tool is KeyCard {
		if (!t.instanceIsA("Tool")(tool)) {
			warn(`Provided keycard '${tool}' is not a tool`);
			return false;
		}

		if (!tool.HasTag(Constants.KEY_CARD_TAG)) {
			warn(`Provided keycard '${tool}' is not tagged with '${Constants.KEY_CARD_TAG}' tag`);
			return false;
		}

		if (!Validators.KeyCardValidator(tool)) {
			warn(`Provided keycard did not passed validation`);
			return false;
		}

		return true;
	}

	public static IsAGatekeeper(instance: unknown): instance is Gatekeeper {
		if (!t.instanceIsA("Instance")(instance)) {
			warn(`Provided gatekeeper '${instance}' is not an instance`);
			return false;
		}

		if (!instance.HasTag(Constants.GATEKEEPER_TAG)) {
			warn(`Provided gatekeeper '${instance}' is not tagged with '${Constants.GATEKEEPER_TAG}' tag`);
			return false;
		}

		if (!Validators.GatekeeperValidator(instance)) {
			warn(`Provided gatekeeper '${instance}' did not passed validation`);
			return false;
		}

		return true;
	}

	/** Returns highest clearance level the player has */
	public static GetPlayerClearanceLevel(player: Player): number {
		let highestLevel = 0;

		for (const tool of this._getPlayerBackpackContents(player)) {
			if (!this.IsAKeyCard(tool)) continue;

			highestLevel = math.max(highestLevel, tool.KeyCardConfig.Level.Value);
		}

		return highestLevel;
	}

	/** Returns an array of keycard tool instances the player has in their backpack */
	public static GetPlayerKeyCards(player: Player): KeyCard[] {
		const keyCards: KeyCard[] = [];

		for (const tool of this._getPlayerBackpackContents(player)) {
			if (!this.IsAKeyCard(tool)) continue;
			keyCards.push(tool);
		}

		return keyCards;
	}

	/** Returns the clearance level of the gatekeeper instance */
	public static GetGatekeeperClearanceLevel(gatekeeper: Gatekeeper): number {
		if (!this.IsAGatekeeper(gatekeeper)) return 0;

		return gatekeeper.GatekeeperConfig.Clearance.Value;
	}

	/** Returns an array of KeyCards the gatekeeper accepts */
	public static GetGatekeeperKeyCards(gatekeeper: Gatekeeper): string[] {
		if (!this.IsAGatekeeper(gatekeeper)) return [];

		const gatekeeperKeyCards: string[] = [];

		for (const stringValue of gatekeeper.GatekeeperConfig.KeyCards.GetChildren()) {
			if (!stringValue.IsA("StringValue")) continue;

			gatekeeperKeyCards.push(stringValue.Value);
		}

		return gatekeeperKeyCards;
	}

	/** Returns a boolean indicating wether or not a player has clearance */
	public static PlayerHasClearance(player: Player, gatekeeper: Gatekeeper): boolean {
		if (this.GetPlayerClearanceLevel(player) >= this.GetGatekeeperClearanceLevel(gatekeeper)) return true;

		const gatekeeperCards = this.GetGatekeeperKeyCards(gatekeeper);
		for (const keyCard of this.GetPlayerKeyCards(player)) {
			if (gatekeeperCards.includes(keyCard.Name)) return true;
		}

		return false;
	}
}

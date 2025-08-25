import { t } from "@rbxts/t";
import Constants from "Constants";
import Validators from "Validators";

export default class ClearanceController implements IClearanceController {
	protected _getPlayerBackpackContents(player: Player): Instance[] {
		return player.FindFirstChildOfClass("Backpack")?.GetChildren() ?? [];
	}

	public IsAKeyCard(tool: unknown): tool is KeyCard {
		if (!t.instanceIsA("Tool")(tool)) return false;
		if (!tool.HasTag(Constants.KEY_CARD_TAG)) return false;
		if (!Validators.KeyCardValidator(tool)) return false;

		return true;
	}

	public IsAGatekeeper(instance: unknown): instance is Gatekeeper {
		if (!t.instanceIsA("Instance")(instance)) return false;
		if (!instance.HasTag(Constants.GATEKEEPER_TAG)) return false;
		if (!Validators.GatekeeperValidator(instance)) return false;

		return true;
	}

	/** Returns highest clearance level the player has */
	public GetPlayerClearanceLevel(player: Player): number {
		let highestLevel = 0;

		for (const tool of this._getPlayerBackpackContents(player)) {
			if (!this.IsAKeyCard(tool)) continue;

			highestLevel = math.max(highestLevel, tool.KeyCardConfig.Level.Value);
		}

		return highestLevel;
	}

	/** Returns an array of keycard tool instances the player has in their backpack */
	public GetPlayerKeyCards(player: Player): KeyCard[] {
		const keyCards: KeyCard[] = [];

		for (const tool of this._getPlayerBackpackContents(player)) {
			if (!this.IsAKeyCard(tool)) continue;
			keyCards.push(tool);
		}

		return keyCards;
	}

	/** Returns the clearance level of the gatekeeper instance */
	public GetGatekeeperClearanceLevel(gatekeeper: Gatekeeper): number {
		if (!this.IsAGatekeeper(gatekeeper)) {
			warn("Invalid gatekeeper provided in 'GetGatekeeperClearanceLevel'");
			return 0;
		}

		return gatekeeper.GatekeeperConfig.Clearance.Value;
	}

	/** Returns an array of KeyCards the gatekeeper accepts */
	public GetGatekeeperKeyCards(gatekeeper: Gatekeeper): string[] {
		if (!this.IsAGatekeeper(gatekeeper)) {
			warn("Invalid gatekeeper provided in 'GetGatekeeperKeyCards'");
			return [];
		}

		const gatekeeperKeyCards: string[] = [];

		for (const stringValue of gatekeeper.GatekeeperConfig.KeyCards.GetChildren()) {
			if (!stringValue.IsA("StringValue")) continue;

			gatekeeperKeyCards.push(stringValue.Value);
		}

		return gatekeeperKeyCards;
	}

	/** Returns a boolean indicating wether or not a player has clearance */
	public PlayerHasClearance(player: Player, gatekeeper: Gatekeeper): boolean {
		if (this.GetPlayerClearanceLevel(player) >= this.GetGatekeeperClearanceLevel(gatekeeper)) return true;

		const gatekeeperCards = this.GetGatekeeperKeyCards(gatekeeper);
		for (const keyCard of this.GetPlayerKeyCards(player)) {
			if (gatekeeperCards.includes(keyCard.Name)) return true;
		}

		return false;
	}
}

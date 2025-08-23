import { t } from "@rbxts/t";
import Constants from "Constants";
import Validators from "Validators";

export default abstract class AccessController {
	protected static _getPlayerBackpackContents(player: Player): Instance[] {
		return player.FindFirstChildOfClass("Backpack")?.GetChildren() ?? [];
	}

	public static IsAKeyCard(keyCard: unknown): keyCard is KeyCard {
		if (!t.instanceIsA("Tool")(keyCard)) return false;
		if (!keyCard.HasTag(Constants.KEY_CARD_TAG)) return false;
		if (!Validators.KeyCardValidator(keyCard)) return false;

		return true;
	}

	public static IsAGatekeeper(gatekeeper: unknown): gatekeeper is Gatekeeper {
		if (!t.instanceIsA("Instance")(gatekeeper)) return false;
		if (!gatekeeper.HasTag(Constants.GATEKEEPER_TAG)) return false;
		if (!Validators.GatekeeperValidator(gatekeeper)) return false;

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

	/** Returns an array of KeyCard instances the player has in their backpack */
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
		if (!this.IsAGatekeeper(gatekeeper)) {
			warn("Invalid gatekeeper provided in 'GetGatekeeperClearanceLevel'");
			return 0;
		}

		return gatekeeper.GatekeeperConfig.Clearance.Value;
	}

	/** Returns an array of KeyCards the gatekeeper accepts */
	public static GetGatekeeperKeyCards(gatekeeper: Gatekeeper): string[] {
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

	/** Returns a boolean indicating wether or not a player has lock down bypass */
	public static PlayerHasLockDownBypass(player: Player): boolean {
		for (const keyCard of this.GetPlayerKeyCards(player)) {
			if (keyCard.KeyCardConfig.LockDownBypass.Value) return true;
		}

		return false;
	}

	/** Returns a boolean indicating wether or not a player has access */
	public static PlayerHasAccess(player: Player, gatekeeper: Gatekeeper): boolean {
		if (!this.IsAGatekeeper(gatekeeper)) {
			warn("Invalid gatekeeper provided to 'PlayerHasAccess'");
			return false;
		}

		if (gatekeeper.GatekeeperConfig.Jammed.Value) return false;
		if (gatekeeper.GatekeeperConfig.LockDown.Value && !this.PlayerHasLockDownBypass(player)) return false;
		if (this.GetPlayerClearanceLevel(player) >= this.GetGatekeeperClearanceLevel(gatekeeper)) return true;

		const gatekeeperCards = this.GetGatekeeperKeyCards(gatekeeper);
		for (const keyCard of this.GetPlayerKeyCards(player)) {
			if (gatekeeperCards.includes(keyCard.Name)) return true;
		}

		return false;
	}
}

# Clearance Controller

The Clearance Controller is a TypeScript module designed for Roblox games to manage player access through a clearance-based system. It allows developers to control access to specific areas or actions by verifying players' clearance levels and keycards against gatekeeper requirements.

## Overview

The module provides a `ClearanceController` class that implements the `IClearanceController` interface. It facilitates checking if players have the necessary clearance or keycards to access restricted areas guarded by gatekeepers. The system uses a tag-based approach combined with configuration validation to ensure robust access control.

## Features

- **Player Clearance Check**: Determines the highest clearance level a player possesses based on keycards in their backpack.
- **Keycard Validation**: Verifies if a tool is a valid keycard with the required configuration.
- **Gatekeeper Validation**: Confirms if an instance is a valid gatekeeper with appropriate configuration.
- **Access Control**: Checks if a player has sufficient clearance or specific keycards to pass a gatekeeper.
- **Type Safety**: Utilizes TypeScript and the `@rbxts/t` library for runtime type checking to ensure robust validation.

## Installation

1. **Add to Project**: Place the provided files (`Constants.ts`, `index.ts`, `ClearanceController.d.ts`, `Validators.ts`) in your Roblox project's TypeScript source directory.
2. **Install Dependencies**:
   - Ensure you have the `@rbxts/t` library installed for type checking.
   - Use a Roblox TypeScript compiler (e.g., `rbxtsc`) to compile the TypeScript code into Lua for Roblox.
3. **Sync with Roblox**: Use a tool like Rojo to sync the compiled code into your Roblox project.

## Usage

### Setting Up KeyCards and Gatekeepers

1. **KeyCard Setup**:
   - Create a `Tool` instance in Roblox Studio.
   - Add a tag named `KeyCard` (as defined in `Constants.ts`) to the tool.
   - Add a `Configuration` instance named `KeyCardConfig` as a child of the tool.
   - Inside `KeyCardConfig`, add a `NumberValue` named `Level` to specify the clearance level (e.g., `1`, `2`, etc.).

2. **Gatekeeper Setup**:
   - Create an `Instance` (e.g., a `Model` or `Part`) in Roblox Studio.
   - Add a tag named `Gatekeeper` (as defined in `Constants.ts`) to the instance.
   - Add a `Configuration` instance named `GatekeeperConfig` as a child of the instance.
   - Inside `GatekeeperConfig`, add:
     - A `NumberValue` named `Clearance` to specify the minimum clearance level required.
     - A `Folder` named `KeyCards` containing `StringValue` instances, each representing the name of an accepted keycard.

### Example Code

```typescript
import ClearanceController from "path/to/ClearanceController";

// Instantiate the controller
const clearanceController = new ClearanceController();

// Check if a player can pass a gatekeeper
const player: Player = game.Players.GetPlayers()[0]; // Example player
const gatekeeper: Gatekeeper = game.Workspace.Gatekeeper; // Example gatekeeper instance

if (clearanceController.PlayerHasClearance(player, gatekeeper)) {
    print(`${player.Name} has clearance to pass the gatekeeper!`);
} else {
    print(`${player.Name} does not have sufficient clearance.`);
}

// Get player's highest clearance level
const clearanceLevel = clearanceController.GetPlayerClearanceLevel(player);
print(`${player.Name}'s highest clearance level: ${clearanceLevel}`);

// Get accepted keycards for a gatekeeper
const keyCards = clearanceController.GetGatekeeperKeyCards(gatekeeper);
print(`Gatekeeper accepts keycards: ${keyCards.join(", ")}`);
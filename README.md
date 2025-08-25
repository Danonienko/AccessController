# Clearance Controller System

This TypeScript-based system, designed for the Roblox platform, manages access control through a clearance-based mechanism using keycards and gatekeepers. It allows developers to check if players have sufficient clearance levels or specific keycards to access restricted areas or resources guarded by gatekeepers.

## Overview

The **ClearanceController** is an abstract class providing static methods to validate and manage interactions between players, keycards, and gatekeepers. It relies on predefined constants, type validators, and type definitions to ensure robust type safety and functionality within a Roblox game environment.

### Key Components

- **Constants.ts**: Defines tags used to identify keycards and gatekeepers.
- **Validators.ts**: Contains type validators to ensure objects meet the structural requirements for keycards and gatekeepers.
- **ClearanceController.d.ts**: TypeScript declaration file defining the types for `KeyCard`, `Gatekeeper`, and their configurations.
- **index.ts**: Core logic implementing the clearance control system with methods to check player clearance, retrieve keycards, and validate gatekeeper interactions.

## File Structure

- `Constants.ts`: Defines constant tags for keycards and gatekeepers.
- `Validators.ts`: Provides type-checking utilities using the `@rbxts/t` library.
- `ClearanceController.d.ts`: Declares TypeScript interfaces for `KeyCard` and `Gatekeeper`.
- `index.ts`: Implements the `ClearanceController` class with static methods for clearance checks and keycard/gatekeeper management.

## Installation

1. Ensure you have a Roblox TypeScript project set up with the `@rbxts/t` library installed for type validation.
2. Place the provided files (`Constants.ts`, `Validators.ts`, `ClearanceController.d.ts`, `index.ts`) in your project's source directory.
3. Configure your Roblox game to include the necessary object hierarchy (e.g., `Tool` instances for keycards, `Configuration` instances for keycard and gatekeeper settings).

## Usage

### Key Concepts

- **KeyCard**: A `Tool` instance tagged with `KeyCard` and containing a `KeyCardConfig` (`Configuration` with a `Level` NumberValue).
- **Gatekeeper**: An `Instance` tagged with `Gatekeeper` and containing a `GatekeeperConfig` (`Configuration` with a `Clearance` NumberValue and a `KeyCards` Folder).
- **Clearance Level**: A numerical value representing the access level of a keycard or the required level for a gatekeeper.
- **KeyCard Validation**: Ensures a tool is a valid keycard using tags and structural checks.
- **Gatekeeper Validation**: Ensures an instance is a valid gatekeeper with the correct configuration.

### Example Setup in Roblox

1. **Create a KeyCard**:
   - Create a `Tool` instance in Roblox Studio.
   - Add a tag named `KeyCard` (as defined in `Constants.ts`).
   - Add a `Configuration` child named `KeyCardConfig`.
   - Inside `KeyCardConfig`, add a `NumberValue` named `Level` with a value (e.g., `5`).

2. **Create a Gatekeeper**:
   - Create an `Instance` (e.g., a `Part` or `Model`) in Roblox Studio.
   - Add a tag named `Gatekeeper`.
   - Add a `Configuration` child named `GatekeeperConfig`.
   - Inside `GatekeeperConfig`, add:
     - A `NumberValue` named `Clearance` with a value (e.g., `3`).
     - A `Folder` named `KeyCards` containing `StringValue` instances, each with a `Value` corresponding to the name of an acceptable keycard (e.g., `KeyCard1`).

3. **Integrate ClearanceController**:
   - Use the `ClearanceController` class in your scripts to check if a player can access a gatekeeper-protected area.

### Example Code

```ts
import ClearanceController from "index";
import { Players } from "@rbxts/services";

// Example: Check if a player can access a gatekeeper
const player = Players.GetPlayers()[0];
const gatekeeper = game.Workspace.FindFirstChild("GatekeeperPart")!;

if (ClearanceController.PlayerHasClearance(player, gatekeeper)) {
    print(`${player.Name} has access to the gatekeeper!`);
} else {
    print(`${player.Name} does not have sufficient clearance.`);
}

// Example: Get player's highest clearance level
const clearanceLevel = ClearanceController.GetPlayerClearanceLevel(player);
print(`${player.Name}'s highest clearance level: ${clearanceLevel}`);

// Example: Get accepted keycards for a gatekeeper
const acceptedKeyCards = ClearanceController.GetGatekeeperKeyCards(gatekeeper);
print(`Gatekeeper accepts keycards: ${acceptedKeyCards.join(", ")}`);
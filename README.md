# AccessController

A TypeScript library for Roblox that provides a comprehensive access control system for managing keycards, security clearance levels, and gatekeeper functionality.

## Features

- 🔑 Keycard management system
- 📊 Clearance level hierarchy
- 🚪 Gatekeeper access control
- 🔒 Lock down system with bypass capabilities
- ✨ Type-safe implementation using roblox-ts
- 🛡️ Robust validation using @rbxts/t

## Usage

### Basic Implementation

```typescript
import AccessController from "accesscontroller";

// Check if a player has access to a gatekeeper
const hasAccess = AccessController.PlayerHasAccess(player, gatekeeper);

// Get player's highest clearance level
const clearanceLevel = AccessController.GetPlayerClearanceLevel(player);

// Check if player has lock down bypass
const hasLockDownBypass = AccessController.PlayerHasLockDownBypass(player);
```

### Keycard Configuration

Keycards must be configured with the following structure:

```lua
-- Tool instance with the "KeyCard" tag
local keyCard = Instance.new("Tool")
keyCard:AddTag("KeyCard")

-- Configuration
local config = Instance.new("Configuration")
config.Name = "KeyCardConfig"

local level = Instance.new("NumberValue")
level.Name = "Level"
level.Value = 5  -- Set clearance level

local bypass = Instance.new("BoolValue")
bypass.Name = "LockDownBypass"
bypass.Value = false  -- Set bypass permission

config.Parent = keyCard
level.Parent = config
bypass.Parent = config
```

### Gatekeeper Configuration

Gatekeepers must be configured with the following structure:

```lua
local gatekeeper = Instance.new("Part")  -- or any other instance

local config = Instance.new("Configuration")
config.Name = "GatekeeperConfig"

-- Required values
local open = Instance.new("BoolValue")
open.Name = "Open"

local lockDown = Instance.new("BoolValue")
lockDown.Name = "LockDown"

local jammed = Instance.new("BoolValue")
jammed.Name = "Jammed"

local clearance = Instance.new("NumberValue")
clearance.Name = "Clearance"
clearance.Value = 3  -- Required clearance level

local keyCards = Instance.new("Folder")
keyCards.Name = "KeyCards"

-- Parent everything
config.Parent = gatekeeper
open.Parent = config
lockDown.Parent = config
jammed.Parent = config
clearance.Parent = config
keyCards.Parent = config
```

## API Reference

### `GetPlayerClearanceLevel(player: Player): number`
Returns the highest clearance level the player has based on their keycards.

### `GetPlayerKeyCards(player: Player): KeyCard[]`
Returns an array of KeyCard instances the player has in their backpack.

### `GetGatekeeperClearanceLevel(gatekeeper: Gatekeeper): number`
Returns the clearance level required by the gatekeeper.

### `GetGatekeeperKeyCards(gatekeeper: Gatekeeper): string[]`
Returns an array of KeyCard names that the gatekeeper accepts.

### `PlayerHasLockDownBypass(player: Player): boolean`
Returns whether the player has any keycard with lock down bypass permission.

### `PlayerHasAccess(player: Player, gatekeeper: Gatekeeper): boolean`
Returns whether the player has access to the gatekeeper based on:
- Gatekeeper's jam status
- Lock down status and player's bypass permission
- Player's clearance level vs gatekeeper's required level
- Player's keycards vs gatekeeper's accepted cards

## Types

The library uses TypeScript for type safety and includes comprehensive type definitions for all components.

## Dependencies

- [@rbxts/t](https://www.npmjs.com/package/@rbxts/t) - Type checking utility
- [roblox-ts](https://roblox-ts.com/) - TypeScript-to-Luau compiler
- TypeScript - Development dependency

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

import { test, expect, describe, jest } from "@jest/globals"
import { Traveller, Wagon } from "../../src/index.js"

describe("Classes test", () => {
  describe("Traveller class", () => {
    const traveller = new Traveller("traveller1")

    test("Traveller's name must be 'traveller1'", () => {
      expect(traveller.name).toMatch("traveller1")
      expect(traveller.name).toBeDefined()
      expect(typeof traveller.name).toBe("string")
    })

    test("Traveller's initial food must be 1", () => {
      expect(traveller.food).toEqual(1)
      expect(traveller.food).toBeDefined()
      expect(typeof traveller.food).toBe("number")
    })
    
    test("Traveller's initial isHealthy must be true", () => {
      expect(traveller.isHealthy).toBeTruthy()
      expect(traveller.isHealthy).toBeDefined()
      expect(typeof traveller.isHealthy).toBe("boolean")
    })

    test("Traveller must increase 2 food after hunt()", () => {
      const initialFood = traveller.food
      
      expect(typeof traveller.hunt).toBe("function")
      expect(traveller.food).toBeDefined()

      traveller.hunt()

      expect(traveller.food).toBeGreaterThan(initialFood)
      expect(traveller.food - initialFood).toEqual(2)
    })

    test("Traveller must decrease 1 food after eat()", () => {
      const initialFood = traveller.food
      
      expect(typeof traveller.eat).toBe("function")
      expect(traveller.food).toBeDefined()

      traveller.eat()

      expect(traveller.food).toBeLessThan(initialFood)
      expect(traveller.food - initialFood).toEqual(-1)
    })

    test("Traveller must have isHealthy false if trying to eat with 0 food", () => {
      traveller.food = 0

      expect(traveller.isHealthy).toBeTruthy()
      
      traveller.eat()

      expect(traveller.isHealthy).toBeFalsy()
      expect(traveller.food).toEqual(0)
    })
  })

  describe("Wagon class", () => {
    const wagon = new Wagon(2)

    const travellers = [
      new Traveller("traveller1"),
      new Traveller("traveller2")
    ]

    test("Wagon's capacity must be 2", () => {
      expect(wagon.capacity).toBeDefined()
      expect(wagon.capacity).toEqual(2)
      expect(typeof wagon.capacity).toMatch("number")
    })

    test("Wagon's initial passangers list must be a empty array", () => {
      expect(wagon.passangers).toBeDefined()
      expect(Array.isArray(wagon.passangers)).toBeTruthy()
      expect(wagon.passangers.length).toBe(0)
    })

    test("wagon.getAvailableSeatCount must return available seats", () => {
      const result = wagon.getAvailableSeatCount()
      
      expect(typeof wagon.getAvailableSeatCount).toBe("function")
      expect(wagon.getAvailableSeatCount).toBeDefined()

      expect(typeof result).toBe("number")
      expect(result).toBeDefined()
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(wagon.capacity)
    })

    test("wagon.join must be added the given traveller into passangers array", () => {
      const result = wagon.join(travellers[0])

      expect(result).toBeTruthy()
      expect(wagon.passangers).toContain(travellers[0])
    })

    test("wagon.join must return false if giver argument isn't instance on 'Traveller'", () => {
      const result = wagon.join("cj")

      expect(result).toBeFalsy()
      expect(wagon.passangers).not.toContain("cj")
    })
    
    test("wagon.join must return false if there's no available seat", () => {
      jest.spyOn(wagon, "getAvailableSeatCount").mockReturnValue(0)

      const result = wagon.join(travellers[1])

      expect(result).toBeFalsy()
    })

    test("wagon.shouldQuarentine should return true if there's one travaller with isHealthy false", () => {
      const sickTraveller = new Traveller("SickTraveller")
      sickTraveller.isHealthy = false
      wagon.passangers.push(sickTraveller)

      const result = wagon.shouldQuarentine()

      expect(result).toBeTruthy()
      wagon.passangers.pop()
    })

    test("wagon.shouldQuarentine should return false if there's no travaller with isHealthy false", () => {
      const result = wagon.shouldQuarentine()

      expect(result).toBeFalsy()
    })
  })
})
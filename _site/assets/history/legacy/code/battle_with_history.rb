#!/usr/bin/env ruby
# frozen_string_literal: true

require 'amazing_print'
require 'sorted_set'
require 'json'
require 'ostruct'

CLUB = 'C'
SPADE = 'S'
HEART = 'H'
DIAMOND = 'D'
NULL = 'N'

class Card
  attr_reader :suit, :value

  def initialize(suit, value)
    @suit = suit
    @value = suit == NULL ? 0 : value
  end

  def to_s
    [suit, value.to_s.rjust(1, '0')].join
  end

  def present?
    suit != NULL
  end
end

class Battle
  attr_accessor :damage, :front_health, :back_health
  attr_reader :attacker, :front, :back

  def initialize(attacker)
    @damage = 0
    @attacker = attacker
  end

  def front=(card)
    @front = card
    @front_health = front.value
    @front
  end

  def back=(card)
    @back = card
    @back_health = back.value
    @back
  end

  def resolve
    attack_hist = []
    front_hist = []
    back_hist = []

    before = nil
    damage = attacker.value
    attack_hist << [before, damage]

    before = nil
    front_health = front.value
    front_hist << [before, front_health]

    before = front_health
    front_health += front.value if front.suit == DIAMOND && back.suit != NULL
    front_hist << [before, front_health]

    before = front_health
    front_health -= attacker.value
    front_hist << [before, front_health]

    before = front_health
    front_health = 0 if front_health.negative?
    front_hist <<  [before, front_health]

    before = damage
    damage -= front.value
    attack_hist << [before, damage]

    before = damage
    damage = 0 if damage.negative?
    attack_hist << [before, damage]

    before = back_health
    back_health = back.value
    back_hist <<  [before, back_health]

    before = back_health
    back_health -= damage
    back_hist << [before, back_health]

    before = back_health
    back_health -= damage if attacker.suit == CLUB
    back_hist << [before, back_health]

    before = back_health
    back_health = 0 if back_health.negative?
    back_hist <<  [before, back_health]

    before = damage
    damage -= back.value
    attack_hist << [before, damage]

    before = damage
    damage = 0 if damage.negative?
    attack_hist << [before, damage]

    before = damage
    damage -= back.value if back.suit == HEART
    attack_hist << [before, damage]

    before = damage
    damage = 0 if damage.negative?
    attack_hist << [before, damage]

    before = damage
    damage += damage if attacker.suit == SPADE
    attack_hist << [before, damage]

    # [attacker, [front, front_health], [back, back_health], damage].to_json
    [
      [:attacker, attacker.to_s],
      [:front, front.to_s],
      [:back, back.to_s],
      [:damage, damage],
      [:attack_hist, attack_hist],
      [:front_hist, front_hist],
      [:back_hist, back_hist]
    ]
  end
end

module Game
  def self.battler(attacker, front, back)
    battle = Battle.new(attacker)
    battle.front = front
    battle.back = back

    battle.resolve
  end
end

ATTACK_VALUE_RANGE = FRONT_VALUE_RANGE = BACK_VALUE_RANGE = (2..9)
ATTACK_SUITS = FRONT_SUITS = BACK_SUITS = [SPADE, HEART, CLUB, DIAMOND, NULL].freeze

games = SortedSet.new

ATTACK_SUITS.each do |attack_suit|
  ATTACK_VALUE_RANGE.each do |attack_value|
    FRONT_SUITS.each do |front_suit|
      FRONT_VALUE_RANGE.each do |front_value|
        BACK_SUITS.each do |back_suit|
          BACK_VALUE_RANGE.each do |back_value|
            next if attack_suit == NULL
            next if front_suit == NULL && back_suit != NULL

            game = Game.battler(
              Card.new(attack_suit, attack_value),
              Card.new(front_suit, front_value),
              Card.new(back_suit, back_value)
            )

            games << game
          end
        end
      end
    end
  end
end

games.each { |game| ap(game, multiline: false) }

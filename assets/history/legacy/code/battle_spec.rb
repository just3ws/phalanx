# frozen_string_literal: true

require 'pry'

require 'spec_helper'

require 'phalanx/battle'

RSpec.shared_context 'attackable', shared_context: :metadata do
  subject(:battle) { described_class.new(attacker:, front:, back:) }

  context 'attacker card' do
    it { expect(battle.attacker.suit).to eq(attacker.suit) }
    it { expect(battle.damage).to eq(attacker.value) }
  end

  context 'front card' do
    it { expect(battle.front.suit).to eq(front.suit) }
    it { expect(battle.front_health).to eq(front.value) }
  end

  context 'back card' do
    it { expect(battle.back.suit).to eq(back.suit) }
    it { expect(battle.back_health).to eq(back.value) }
  end

  describe '#attack!' do
    before { battle.attack! }

    context 'damage' do
      it { expect(battle.damage).to be_positive }
      it { expect(battle.damage).to eq(expected.damage) }
    end

    context 'front card' do
      it { expect(battle.front_health).to be_negative }
      it { expect(battle.front_health).to eq(expected.front_health) }
    end

    context 'back card' do
      it { expect(battle.back_health).to be_negative }
      it { expect(battle.back_health).to eq(expected.back_health) }
    end
  end
end

module Phalanx
  include Cards

  ExpectedBattleState = Struct.new('ExpectedBattleState', :damage, :front_health, :back_health)

  RSpec.describe Battle do
    describe '.parse' do
      let(:signature) { 'D7|C2:S8' }

      subject(:battle) { described_class.parse(signature) }

      it { expect(battle.attacker).to eq(Diamond.new(value: 7)) }

      it { expect(battle.front).to eq(Club.new(value: 2)) }
      it { expect(battle.back).to eq(Spade.new(value: 8)) }
    end

    context 'D9|N0:N0' do
      let(:signature) { 'D7|C2:S8' }
      let(:expected) { ExpectedBattleState.new(9, -9, -9) }
      let(:attacker) { Diamond.new(value: 9) }
      let(:front) { Null.new }
      let(:back) { Null.new }

      subject(:battle) { described_class.parse(signature) }

      include_examples 'attackable'
    end

    context 'H9|N0:N0' do
      let(:attacker) { Heart.new(value: 9) }
      let(:front) { Null.new }
      let(:back) { Null.new }

      let(:expected) { ExpectedBattleState.new(9, -9, -9) }

      include_examples 'attackable'
    end

    context 'S9|N0:N0' do
      let(:attacker) { Spade.new(value: 9) }
      let(:front) { Null.new }
      let(:back) { Null.new }

      let(:expected) { ExpectedBattleState.new(18, -9, -9) }

      include_examples 'attackable'
    end

    context 'C9|N0:N0' do
      let(:attacker) { Club.new(value: 9) }
      let(:front) { Null.new }
      let(:back) { Null.new }

      let(:expected) { ExpectedBattleState.new(9, -9, -18) }

      include_examples 'attackable'
    end

    context 'C9|D3:D2' do
      let(:attacker) { Club.new(value: 9) }
      let(:front) { Diamond.new(value: 3) }
      let(:back) { Diamond.new(value: 2) }

      let(:expected) { ExpectedBattleState.new(4, -3, -10) }

      include_examples 'attackable'
    end

    context 'C7|D3:D2' do
      let(:attacker) { Club.new(value: 7) }
      let(:front) { Diamond.new(value: 3) }
      let(:back) { Diamond.new(value: 2) }

      let(:expected) { ExpectedBattleState.new(2, -1, -6) }

      include_examples 'attackable'
    end

    context 'C|D:H'
    context 'C|D:X'
    context 'C|D:_'
    context 'C|H:D'
    context 'C|H:H'
    context 'C|H:X'
    context 'C|H:_'
    context 'C|X:D'
    context 'C|X:H'
    context 'C|X:X'
    context 'C|X:_'
    context 'C|_:_'

    context 'X' do
      context 'D:D'
      context 'D:H'
      context 'D:X'
      context 'D:_'
      context 'H:D'
      context 'H:H'
      context 'H:X'
      context 'H:_'
      context 'X:D'
      context 'X:H'
      context 'X:X'
      context 'X:_'
      context '_:_'
    end

    context 'S' do
      context 'D:D'
      context 'D:H'
      context 'D:X'
      context 'D:_'
      context 'H:D'
      context 'H:H'
      context 'H:X'
      context 'H:_'
      context 'X:D'
      context 'X:H'
      context 'X:X'
      context 'X:_'
      context '_:_'
    end
  end
end

from __future__ import annotations

import collections
import dataclasses
import datetime
import operator
from typing import *


class Model:
    fasts: List[Fast]
    meals: List[Meal]

    @property
    def foods(self) -> Iterator[Food]:
        """Return foods ordered by when they were last used"""
        done = set()
        todo = collections.deque()
        for meal in self.meals:
            todo.append(meal.components)

        while todo:
            product = todo.popleft()
            yield product
            done.add(product)  # TODO: Remove duplicates
            factors = product.foods
            for factor in factors:
                if factor not in done:
                    todo.append(factor)


@dataclasses.dataclass()
class Fast:
    name: str
    target_start: datetime.datetime
    target_end: datetime.datetime

    @property
    def target_duration(self) -> datetime.timedelta:
        return self.target_end - self.target_start

    def actual_duration(self, meals: Iterable[Meal]) -> datetime.timedelta:
        actual_start = max(
            (meal for meal in meals if meal.end <= self.target_start),
            key=operator.attrgetter("end"),
        ).end
        actual_end = max(
            (meal for meal in meals if self.target_end <= meal.start),
            key=operator.attrgetter("start"),
        ).start
        return actual_end - actual_start


@dataclasses.dataclass()
class Food:
    name: str
    quantity: float
    nutrients_override: Dict[str, float]
    components: Dict[Food, float]

    @property
    def nutrients(self) -> Dict[str, float]:
        result = collections.defaultdict(float)
        for food, food_quantity in self.components.items():
            for nutrient, nutrient_quantity in food.nutrients.items():
                result[nutrient] += nutrient_quantity * food_quantity / food.quantity
        result.update(self.nutrients_override)
        return result


@dataclasses.dataclass()
class Meal:
    name: str
    start: datetime.datetime
    end: datetime.datetime
    components: Dict[Food, float]

    @property
    def nutrients(self) -> Dict[str, float]:
        result = collections.defaultdict(float)
        for food, food_quantity in self.components.items():
            for nutrient, nutrient_quantity in food.nutrients.items():
                result[nutrient] += nutrient_quantity * food_quantity / food.quantity
        return result

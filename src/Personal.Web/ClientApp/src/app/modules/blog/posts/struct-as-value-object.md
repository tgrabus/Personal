In C# you have two choices for representing value objects, either use class or struct.

In this article we look closer into struct as base building block for value objects. I would like to show you benefits and drawbacks of using structs so it will be easier to you to make decision what you should choose.

## Why are you want to make a value object as struct?

You can say for performance reasons. That makes sense as internally structures are allocated in memory stack. Thus structure allocation and deallocation is cheaper and faster operation in comparison to reference types.

On the other hand when you compare structures then you can fall into the trap. Default implementation of Equals and GetHashCode might not be so performant to you. Internally it can use reflection for comparing struct fields which may impact performance noticeably when you deal with huge collections or dictionaries. Fortunately it is enough to override Equals and GetHashCode and ideally implement IEquatable interface to mitigate risk of boxing.

Next benefit of structures is they are immutable values out of the box. Immutability gives you advantage when it comes to multi threading. If you share structs between threads then it is not required to synchronize your critical code. If shared structure is changed by any thread then the change is local to this thread and not propagated to the others. Thus, immutability can be desired feature you want to have for your value objects.

Main drawback of structs is they cannot be fully controlled how instances are created. You typically create constructors and define the rules how instances can be created. Unfortunately you cannot control default instantiation which uses parameterless constructor and cannot be overridden or hidden. This is issue if you want to build high encapsulated domain model. It opens the gate for breaking or bypassing domain model rules.

Next issue of using structs might be boxing. You have to be extremely careful how you process your structures. If you pass your instance of struct type over method that operate on reference types then you become victim of boxing. You can imagine how it impacts performance and memory when you process huge collection in this way.

## Summarize

Structs give you:

- the best performance if used correctly
- immutability out of the box

but consequences are:
- not full encapsulation (default constructor)
- need to take care of boxing

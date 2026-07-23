well here i am writing about rust. This will be a long journey so let's sit back, have a sip of coffee; perhaps a glass of water is okay too.

So this journey only started because my boyfriend was telling me about how language "Rust" is replacing a lot of backend structure for major tech companies.
I, a 3rd semester student at a college (not doing great and i'm like 28 at this point), thought this is odd.
Little did i know, 8 months later, i'm expected to learn and implement some things with the language. 

Okay so my frist task given with this language was to implement the HTTP server.
But before we dive into it, he's going to say some things. SUCH AS:

"Since Rust doesn't have a garbage collector, the compiler emits essentially the same instructions as a C or C++ program. (as rust bundles clang internally) Since all of them compile down to the same thing, they can all talk to each other directly. A C or C++ program can call a Rust program too since its just the same platform-direct format. This is called an "ABI" -- Application binary interface, and Rust CAN use the C ABI directly, and C++ DOES use the C ABI in most cases."

well i wrote this down here so I don't forget
you know. it's for my home kind thing that i get to save and remember 

okay all these data types... do they really mean anything?? I mean it's just feels like a lot of jargen 
signed and unsigned means it can be negative or positive. unsigned means it'll always be positive. i guess it's because there "won't be any signs" such as negative.

another thing to note is the i32 and i64. Rust seems like a language that's very specific

i32 and i64 numbers refer to number that can be consumed or produced in a single cycle by the CPU. So each 32 bit or 64 bit is processed in a way that is optimized to handle each sizes at the time. 

'''
So, on a 32-bit platform, a 16-bit integer loaded into a 32-bit address would need to have 16 bits zeroed out so that the CPU could operate on it; a 32-bit integer would be immediately usable without any alteration, and a 64-bit integer would need to be operated on in two or more CPU cycles (once for the low 32-bits, and then again for the high 32-bits).

Conversely, on a 64-bit platform, 16-bit integers would need to have 48 bits zeroed, 32-bit integers would need to have 32 bits zeroed, and 64-bit integers could be operated on immediately.
'''
this bit is from the stackoverflow website

a lot of processing will be limited by bandwidth to RAM and i32 is half the size of an i64

isize and usize types depend on the architecture of the computer your porgram is running on: 64 bitysd if you're on a 64bit architecture and 32bits if you're on a 32bit architecture.

---------------------------

this is one of the vector exercises (23/94)

fn array_and_vec() -> ([i32; 4], Vec<i32>) {
    let a = [10, 20, 30, 40]; // Array

    // TODO: Create a vector called `v` which contains the exact same elements as in the array `a`.
    // Use the vector macro.
    // let v = ???;
    
    //let v = vec![a[0],a[1],a[2],a[3]]; -- gpod answer
    //let v: Vec<i32> = a.into_iter().collect(); --good answer
    let v = a.to_vec(); --good answer bit there's a catch

    (a, v)
}

fn main() {
    // You can optionally experiment here.
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_array_and_vec_similarity() {
        let (a, v) = array_and_vec();
        assert_eq!(a, *v);
    }
}

so when i do this let v = a.to_vec(); the return value has to be  (a, v) without semicolon because APPARENTLY
in rust the last expression in a function body iwhtout a semicolon is the return value. meaning that it's an expression meaning it evaluates to a value


vec is also not inherently immutable when initialized -

std::clone - calling clone always produces a new value 
cloned struct will share mutable state with the original
different from Copy:
- Copy is implicit and an inexpensive bit-wise copy
- Clone is always explicit and my or may not be expensive
- 

Here we go we're going thorugh Ownership
okay the rules are:
1. each value in Rust has an **Owner**
2. There is only ONE owner at a time
3. When the onwer goes out of scope, the value will be dropper <- not sure what this mean tho like dropped??

Onwership can happen when it the value with ownership comes into scope, until and before it goes out of scope

Strings and literals take different approaches when storing ownerships


Struct and ownershiip chapter 5 i will definitely have to go over it because it's where ownership gets a little bit more confusing


Enum is the teratory that deals with custom data types and the value that resides in the enum types are consider the same data type but different with different values. for example IpAddr can be IPV4 or IPV6 both are IP address kind but with different types
so when i do enum ipaddrkind{v4, v6} this creates diff types of same data structure
also in enum each varients can have different types and amounts of associate data
tuples ()
struct {} so be aware!

match within the enum for control flow 
&mut self means i need a mutable reference to myself so i can change my own fields
=> is the whole unpacking so The left side unpacks, the right side uses what was unpacked if there anything more than just static values

okay so we're working wiht byte indexing vs. character indexing. Idk how but i'm at exercise 39 and we're working with string since 35. There are about 94 exercises left and i want to finish all of these soon so that i can be more proficient in understanding rust

In rust strings are stored as UTF-8 encoded byte sequence and it's a varible width encoding
This byte indexing vs. character indexing is Rust specific
byte indexing: 
Rust allows yout o access raw bytes but it doesn't allow direct integer indexing for single characters because single characters can take 1-4bytes depending

general rule of thumb for function parameters is to pass a string slice if you only need to read the data and pass an owned String if you need to take ownership of it
.into() converts the object into a different type https://www.reddit.com/r/rust/comments/p69c9w/what_does_the_into_method_do/

`.into()` converts a type into an expected type.
If it is called where `String` is expected, it will convert `&str` to `String`.
methods like .to_string(), .to_owned(), .from() = allocate new memory on the heap and copy the string data into it so borrow -> then own the copy so when using these method the ownership moves?

```Rust
fn string_slice(arg: &str) {
    println!("{arg}");
}

fn string(arg: String) {
    println!("{arg}");
}

// TODO: Here are a bunch of values - some are `String`, some are `&str`.
// Your task is to replace `placeholder(…)` with either `string_slice(…)`
// or `string(…)` depending on what you think each value is.
fn main() {
    string_slice("blue"); //this is just actual string which means it's embedded directly in the compiled binary and lives for the entire program meaning the type is &= static str

    string("red".to_string()); //this is char and is later converted to string so

    string(String::from("hi")); //this is allocated on the heap at runtime

    string("rust is fun!".to_owned()); //to_owned() 

    string_slice("nice weather".into());

    string(format!("Interpolation {}", "Station"));
    
    // WARNING: This is byte indexing, not character indexing.
    // Character indexing can be done using `s.chars().nth(INDEX)`.
    string_slice(&String::from("abc")[0..1]);

    string_slice("  hello there ".trim());

    string("Happy Monday!".replace("Mon", "Tues"));

    string("mY sHiFt KeY iS sTiCkY".to_lowercase());
}
```
now here we encounter the line with &String::from("abc")[0..1] so from my understanding this is referencing from the string abc and because it's using .from() it chnages ownership as it allocates memory in heap then accesss the word by indexing 

so apparently ownership and borrowing arent' mutually exclusive and can happen in sequence???

now here's the thing the order of operation in code when things happen which has confused me for a long time
there are two methods to this apparently which are:
1. Method chains = left to right operations
2. prefix operaitons + indexing = inside out so operation happens from  inside to outside
it's like PEMDAS from math kinda

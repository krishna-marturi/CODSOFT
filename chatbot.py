import streamlit as st
from datetime import datetime
# --- 1. CORE DICTIONARY (Standard Pattern Matching) ---
rules = {
    "greetings": (["hi", "hello", "hey", "hii"], "👋 Hello {name}! How can I help you today?"),
    "name_query": (["name", "identity", "who are you"], "🤖 I am a Smart Rule-Based Chatbot built by {name}."),
    "college": (["college", "lbrce", "engineering"], "🏫 Core academic concepts are highly valuable for your tech growth, {name}."),
    "python": (["python", "coding", "programming"], "🐍 **Python:** A friendly language used as the core backbone for AI/ML development."),
    "ai": (["artificial intelligence", "ai"], "🧠 **AI:** Technology that trains computers to think and make decisions like humans."),
    "ml": (["machine learning", "ml"], "📊 **ML:** A branch of AI where models learn pattern sets automatically from old data."),
    "help": (["help", "menu", "options"], "💡 Ask me about: *Greetings, Name, College, Python, AI, ML, Internship, or Time*. Type *'bye'* to exit.")
}
# --- 2. CORE BRAIN FUNCTION ---
def get_bot_response(user_text, name):
    """Processes rules pattern matching and returns custom response strings."""
    clean_input = user_text.lower().strip()
    if clean_input == "bye":
        return f"🏁 Goodbye **{name}**! Have an excellent and productive day ahead."
    
    # --- SHORT & SIMPLE INTERNSHIP DIRECT OVERRIDE ROUTING ---
    if any(k in clean_input for k in ["internship", "task", "codsoft"]):
        return f"""
💼 **Internship:** A short program where students work on real projects to build practical skills before a real job.
🚀 **CodSoft Internship:** A virtual platform providing hands-on tasks, where this Chatbot is Task 1 to build your software portfolio, {name}!
        """
    # Dynamic Date & Time System Call
    if any(k in clean_input for k in ["date", "time", "clock", "day"]):
        return f"⏰ **System Clock:** Hello {name}, the current system status is: `{datetime.now().strftime('%A, %B %d, %Y at %I:%M %p')}`"
        
    # Dictionary lookup matching loops
    for topic, (keywords, reply) in rules.items():
        if any(k in clean_input for k in keywords):
            return reply.format(name=name)
    return f"🔍 Hello {name}, I only know specific topics. Type **'help'** to see my supported keywords database!"

# --- 3. GRAPHICAL USER INTERFACE ENGINE ---
st.set_page_config(page_title="Smart Rule Bot", page_icon="🤖")
st.title("🤖 Smart Rule-Based Chatbot System")
st.write("---")
if "user_name" not in st.session_state: st.session_state.user_name = ""
if "messages" not in st.session_state: st.session_state.messages = []

# Phase 1: Login Check Layout
if not st.session_state.user_name:
    st.write("### 💻 System Login initialization:")
    name_input = st.text_input("Enter your name profile to connect:")
    if st.button("Initialize Chat") and name_input.strip():
        st.session_state.user_name = name_input.strip()
        st.session_state.messages.append({"role": "assistant", "text": f"Connect established! Welcome **{st.session_state.user_name}**! Type 'hi' or 'help' to start."})
        st.rerun()
else:
    # Render historical chat records
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]): st.markdown(msg["text"])

    # Phase 2: Active User Stream input channel
    if user_prompt := st.chat_input("Ask a question here..."):
        with st.chat_message("user"): st.markdown(user_prompt)
        st.session_state.messages.append({"role": "user", "text": user_prompt})
        
        # Trigger modular function execution logic 
        bot_reply = get_bot_response(user_prompt, st.session_state.user_name)
        with st.chat_message("assistant"): st.markdown(bot_reply)
        st.session_state.messages.append({"role": "assistant", "text": bot_reply})

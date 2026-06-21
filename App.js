import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, ScrollView, ActivityIndicator, Alert, Modal,
  KeyboardAvoidingView, Platform, SafeAreaView
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, updateDoc, increment, orderBy, query, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANSWDYC1X1mmzEnvW8MMWqHYTUgZHHJAs",
  authDomain: "doublegg-69ac3.firebaseapp.com",
  projectId: "doublegg-69ac3",
  storageBucket: "doublegg-69ac3.firebasestorage.app",
  messagingSenderId: "65285634133",
  appId: "1:65285634133:web:39442847f274e798433cdc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const C = {
  black: '#080808', card: '#111111', gold: '#FFD700', gold2: '#FFA500',
  white: '#f5f5f5', gray: '#888', border: 'rgba(255,215,0,0.12)',
  green: '#00c853', red: '#ff5252', purple: '#9b5cff',
};

const PROFILES = [
  { id:'1', name:'Alex K.', username:'alexk', bio:'Crypto enthusiast 🚀', tags:['Crypto','DeFi'], emoji:'🔥' },
  { id:'2', name:'Sarah M.', username:'sarahm', bio:'Digital artist 🎨', tags:['Art','NFT'], emoji:'🎨' },
  { id:'3', name:'Mike R.', username:'miker', bio:'Web3 builder 💡', tags:['Tech','Web3'], emoji:'💡' },
  { id:'4', name:'Luna T.', username:'lunat', bio:'Music & crypto 🎵', tags:['Music','Crypto'], emoji:'🎵' },
];

const SHOP = [
  { id:'1', name:'Spotlight', price:10, icon:'🌟', desc:'Featured 24h' },
  { id:'2', name:'Super Like', price:2, icon:'💛', desc:'Stand out' },
  { id:'3', name:'Premium', price:50, icon:'💎', desc:'Exclusive/mo' },
  { id:'4', name:'Anonymous', price:20, icon:'🎭', desc:'Browse privately' },
  { id:'5', name:'Rose', price:5, icon:'🌹', desc:'Send a gift' },
  { id:'6', name:'Crown', price:15, icon:'👑', desc:'Royal gift' },
];

// ─── LOGIN ───────────────────────────────────────────────
function LoginScreen({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !pass) { Alert.alert('Error', 'Fill all fields'); return; }
    setLoading(true);
    try { await signInWithEmailAndPassword(auth, email, pass); }
    catch { Alert.alert('Error', 'Invalid email or password'); }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={s.flex} behavior={Platform.OS==='ios'?'padding':'height'}>
      <ScrollView contentContainerStyle={s.authWrap} keyboardShouldPersistTaps="handled">
        <Text style={s.logo}>DOUBLEGG</Text>
        <Text style={s.tagline}>Post. Vibe. Earn $DLGG 🏆</Text>
        <View style={s.card}>
          <Text style={s.cardTitle}>Welcome <Text style={s.gold}>Back</Text></Text>
          <Text style={s.lbl}>Email</Text>
          <TextInput style={s.inp} placeholder="your@email.com" placeholderTextColor="#555" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Text style={s.lbl}>Password</Text>
          <TextInput style={s.inp} placeholder="••••••••" placeholderTextColor="#555" value={pass} onChangeText={setPass} secureTextEntry />
          <TouchableOpacity style={s.btn} onPress={login} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={s.btnText}>Sign In</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={onSwitch}>
            <Text style={s.sw}>No account? <Text style={s.gold}>Sign Up</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── REGISTER ────────────────────────────────────────────
function RegisterScreen({ onSwitch }) {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!first||!last||!user||!email||!pass) { Alert.alert('Error','Fill all fields'); return; }
    if (pass.length < 6) { Alert.alert('Error','Password min 6 chars'); return; }
    setLoading(true);
    try {
      const c = await createUserWithEmailAndPassword(auth, email, pass);
      await setDoc(doc(db,'users',c.user.uid), {
        firstName:first, lastName:last, username:user.replace('@',''), email,
        dlggBalance:5, dlggEarned:5, posts:0, likesReceived:0,
        walletAddress:null, dailyLikesEarned:0, dailyMatches:0,
        lastDailyReset:new Date().toDateString(), lastDailyClaim:null,
        createdAt:serverTimestamp()
      });
    } catch(e) {
      Alert.alert('Error', e.code==='auth/email-already-in-use'?'Email in use':'Registration failed');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView style={s.flex} behavior={Platform.OS==='ios'?'padding':'height'}>
      <ScrollView contentContainerStyle={s.authWrap} keyboardShouldPersistTaps="handled">
        <Text style={s.logo}>DOUBLEGG</Text>
        <Text style={s.tagline}>Join & Earn $DLGG 🎉</Text>
        <View style={s.card}>
          <Text style={s.cardTitle}>Create <Text style={s.gold}>Account</Text></Text>
          <View style={{flexDirection:'row',gap:8}}>
            <View style={{flex:1}}><Text style={s.lbl}>First Name</Text><TextInput style={s.inp} placeholder="John" placeholderTextColor="#555" value={first} onChangeText={setFirst} /></View>
            <View style={{flex:1}}><Text style={s.lbl}>Last Name</Text><TextInput style={s.inp} placeholder="Doe" placeholderTextColor="#555" value={last} onChangeText={setLast} /></View>
          </View>
          <Text style={s.lbl}>Username</Text>
          <TextInput style={s.inp} placeholder="username" placeholderTextColor="#555" value={user} onChangeText={setUser} autoCapitalize="none" />
          <Text style={s.lbl}>Email</Text>
          <TextInput style={s.inp} placeholder="your@email.com" placeholderTextColor="#555" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <Text style={s.lbl}>Password (min 6)</Text>
          <TextInput style={s.inp} placeholder="••••••••" placeholderTextColor="#555" value={pass} onChangeText={setPass} secureTextEntry />
          <TouchableOpacity style={s.btn} onPress={register} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={s.btnText}>Create Account 🎉</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={onSwitch}>
            <Text style={s.sw}>Have account? <Text style={s.gold}>Sign In</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── FEED ────────────────────────────────────────────────
function FeedScreen({ userData, reloadUser }) {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    try {
      const q = query(collection(db,'posts'), orderBy('createdAt','desc'));
      const snap = await getDocs(q);
      setPosts(snap.docs.map(d=>({id:d.id,...d.data()})));
    } catch(e){}
    setLoading(false);
  };

  const share = async () => {
    if (!text.trim()) return;
    const uid = auth.currentUser?.uid;
    try {
      await addDoc(collection(db,'posts'), {
        text:text.trim(), uid,
        firstName:userData?.firstName, lastName:userData?.lastName,
        username:userData?.username, likes:0, comments:0,
        createdAt:serverTimestamp()
      });
      await updateDoc(doc(db,'users',uid), {posts:increment(1)});
      setText(''); loadPosts(); reloadUser();
    } catch(e){ Alert.alert('Error','Failed to post'); }
  };

  const like = async (postId, ownerId) => {
    const uid = auth.currentUser?.uid;
    if (ownerId===uid) { Alert.alert('','Cannot like own post'); return; }
    try {
      const ownerSnap = await getDoc(doc(db,'users',ownerId));
      const ownerLikes = ownerSnap.data()?.dailyLikesEarned||0;
      await updateDoc(doc(db,'posts',postId), {likes:increment(1)});
      if (ownerLikes<50) {
        await updateDoc(doc(db,'users',ownerId), {dlggBalance:increment(0.1),dlggEarned:increment(0.1),likesReceived:increment(1),dailyLikesEarned:increment(1)});
      } else {
        await updateDoc(doc(db,'users',ownerId), {likesReceived:increment(1)});
      }
      loadPosts();
    } catch(e){}
  };

  const ago = (ts) => {
    if (!ts) return 'now';
    const d = Math.floor((new Date()-ts.toDate())/1000);
    if (d<60) return 'just now';
    if (d<3600) return `${Math.floor(d/60)}m`;
    if (d<86400) return `${Math.floor(d/3600)}h`;
    return `${Math.floor(d/86400)}d`;
  };

  return (
    <View style={s.flex}>
      <View style={s.nav}><Text style={s.navLogo}>GG</Text><Text style={s.navTitle}>Feed</Text><View style={{width:40}}/></View>
      <FlatList
        data={posts}
        keyExtractor={i=>i.id}
        onRefresh={loadPosts}
        refreshing={loading}
        contentContainerStyle={{padding:12}}
        ListHeaderComponent={
          <View style={s.createBox}>
            <View style={s.av}><Text style={s.avTxt}>{(userData?.firstName||'?')[0]}</Text></View>
            <TextInput style={s.postInp} placeholder="Share something..." placeholderTextColor="#555" value={text} onChangeText={setText} multiline />
            <TouchableOpacity style={s.shareBtn} onPress={share}><Text style={s.shareBtnTxt}>Share</Text></TouchableOpacity>
          </View>
        }
        ListEmptyComponent={<View style={s.empty}><Text style={{fontSize:40}}>📝</Text><Text style={s.emptyTxt}>No posts yet!</Text></View>}
        renderItem={({item})=>(
          <View style={s.pCard}>
            <View style={s.pHead}>
              <View style={s.av}><Text style={s.avTxt}>{(item.firstName||'?')[0]}</Text></View>
              <View><Text style={s.pName}>{item.firstName} {item.lastName}</Text><Text style={s.pMeta}>@{item.username} · {ago(item.createdAt)}</Text></View>
            </View>
            <Text style={s.pTxt}>{item.text}</Text>
            <View style={{flexDirection:'row',gap:16}}>
              <TouchableOpacity onPress={()=>like(item.id,item.uid)}><Text style={s.actTxt}>❤️ {item.likes||0}</Text></TouchableOpacity>
              <TouchableOpacity><Text style={s.actTxt}>💬 {item.comments||0}</Text></TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// ─── DISCOVER ────────────────────────────────────────────
function DiscoverScreen({ userData }) {
  const [profiles, setProfiles] = useState(PROFILES);
  const [matches, setMatches] = useState(0);

  const pass = (id) => setProfiles(p=>p.filter(x=>x.id!==id));

  const connect = async (id) => {
    if (matches>=3) { Alert.alert('Limit','Max 3 connects/day'); return; }
    const uid = auth.currentUser?.uid;
    try {
      await updateDoc(doc(db,'users',uid), {dailyMatches:increment(1)});
      setMatches(m=>m+1);
      setProfiles(p=>p.filter(x=>x.id!==id));
      Alert.alert('🤝 Connected!','New connection made!');
    } catch(e){}
  };

  return (
    <View style={s.flex}>
      <View style={s.nav}><Text style={s.navLogo}>GG</Text><Text style={s.navTitle}>Discover</Text><Text style={{color:C.gold,fontWeight:'700'}}>{matches}/3</Text></View>
      <ScrollView contentContainerStyle={{padding:12}}>
        {profiles.length===0
          ? <View style={s.empty}><Text style={{fontSize:40}}>🎉</Text><Text style={s.emptyTxt}>No more profiles!</Text></View>
          : profiles.map(p=>(
            <View key={p.id} style={[s.card,{alignItems:'center',marginBottom:12}]}>
              <Text style={{fontSize:50,marginBottom:10}}>{p.emoji}</Text>
              <Text style={[s.cardTitle,{marginBottom:4}]}>{p.name}</Text>
              <Text style={{color:C.gray,fontSize:13,marginBottom:8}}>@{p.username}</Text>
              <Text style={{color:'#aaa',fontSize:14,textAlign:'center',marginBottom:12}}>{p.bio}</Text>
              <View style={{flexDirection:'row',gap:6,marginBottom:16,flexWrap:'wrap',justifyContent:'center'}}>
                {p.tags.map(t=><View key={t} style={s.tag}><Text style={s.tagTxt}>{t}</Text></View>)}
              </View>
              <View style={{flexDirection:'row',gap:10,width:'100%'}}>
                <TouchableOpacity style={s.passBtn} onPress={()=>pass(p.id)}><Text style={{color:C.red,fontWeight:'700'}}>👎 Pass</Text></TouchableOpacity>
                <TouchableOpacity style={s.connBtn} onPress={()=>connect(p.id)}><Text style={{color:'#000',fontWeight:'800'}}>🤝 Connect</Text></TouchableOpacity>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

// ─── WALLET ──────────────────────────────────────────────
function WalletScreen({ userData, reloadUser }) {
  const [tab, setTab] = useState('wallet');
  const [wModal, setWModal] = useState(false);
  const [wAmt, setWAmt] = useState('');
  const today = new Date().toDateString();
  const claimed = userData?.lastDailyClaim===today;

  const claimDaily = async () => {
    if (claimed) { Alert.alert('','Already claimed today!'); return; }
    const uid = auth.currentUser?.uid;
    try {
      await updateDoc(doc(db,'users',uid), {dlggBalance:increment(0.5),dlggEarned:increment(0.5),lastDailyClaim:today});
      reloadUser(); Alert.alert('🎁 +0.5 DLGG','Daily reward claimed!');
    } catch(e){}
  };

  const buy = async (item) => {
    const bal = userData?.dlggBalance||0;
    if (bal<item.price) { Alert.alert('','Not enough DLGG'); return; }
    Alert.alert('Buy '+item.name, `${item.price} DLGG?`, [
      {text:'Cancel',style:'cancel'},
      {text:'Buy', onPress:async()=>{
        const uid = auth.currentUser?.uid;
        await updateDoc(doc(db,'users',uid), {dlggBalance:increment(-item.price)});
        reloadUser(); Alert.alert('✅','Purchased!');
      }}
    ]);
  };

  const withdraw = async () => {
    const amt = parseFloat(wAmt);
    const bal = userData?.dlggBalance||0;
    if (!amt||amt<100) { Alert.alert('','Min 100 DLGG'); return; }
    if (amt>bal) { Alert.alert('','Not enough balance'); return; }
    if (!userData?.walletAddress) { Alert.alert('','Connect wallet in Profile first'); return; }
    const uid = auth.currentUser?.uid;
    try {
      await addDoc(collection(db,'withdrawals'), {uid,amount:amt,walletAddress:userData.walletAddress,status:'pending',createdAt:serverTimestamp()});
      await updateDoc(doc(db,'users',uid), {dlggBalance:increment(-amt)});
      reloadUser(); setWModal(false); setWAmt('');
      Alert.alert('✅ Success',`${amt} DLGG withdrawal submitted!`);
    } catch(e){}
  };

  return (
    <View style={s.flex}>
      <View style={s.nav}><Text style={s.navLogo}>GG</Text><Text style={s.navTitle}>Wallet</Text><View style={{width:40}}/></View>
      <View style={{flexDirection:'row',backgroundColor:C.card,borderBottomWidth:1,borderBottomColor:C.border}}>
        <TouchableOpacity style={[s.tab,tab==='wallet'&&s.tabActive]} onPress={()=>setTab('wallet')}><Text style={[s.tabTxt,tab==='wallet'&&{color:C.gold}]}>💰 Wallet</Text></TouchableOpacity>
        <TouchableOpacity style={[s.tab,tab==='shop'&&s.tabActive]} onPress={()=>setTab('shop')}><Text style={[s.tabTxt,tab==='shop'&&{color:C.gold}]}>🛒 Shop</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{padding:12}}>
        {tab==='wallet' ? (
          <>
            <View style={s.dailyCard}>
              <Text style={{fontSize:28}}>🎁</Text>
              <View style={{flex:1,marginLeft:12}}><Text style={{color:C.white,fontWeight:'700'}}>Daily Reward</Text><Text style={{color:C.gray,fontSize:12}}>+0.5 DLGG every day</Text></View>
              <TouchableOpacity style={[s.claimBtn,claimed&&{opacity:0.4}]} onPress={claimDaily} disabled={claimed}>
                <Text style={{color:'#000',fontWeight:'700'}}>{claimed?'Claimed ✓':'Claim'}</Text>
              </TouchableOpacity>
            </View>
            <View style={s.balCard}>
              <Text style={{color:C.gray,fontSize:12,marginBottom:4}}>DLGG Balance</Text>
              <Text style={{color:C.gold,fontSize:38,fontWeight:'900'}}>{(userData?.dlggBalance||0).toFixed(2)}</Text>
              <Text style={{color:C.gray,fontSize:12,marginBottom:16}}>≈ ${((userData?.dlggBalance||0)*0.0000015).toFixed(6)} USD</Text>
              <View style={{flexDirection:'row',gap:10}}>
                <TouchableOpacity style={s.btn} onPress={()=>setWModal(true)}><Text style={s.btnText}>💸 Withdraw</Text></TouchableOpacity>
                <TouchableOpacity style={s.btnOut} onPress={()=>setTab('shop')}><Text style={s.btnOutTxt}>🛒 Shop</Text></TouchableOpacity>
              </View>
            </View>
            <View style={s.statsCard}>
              <Text style={{color:C.gold,fontWeight:'700',marginBottom:10}}>📊 Today's Limits</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:4}}><Text style={{color:C.gray,fontSize:12}}>Likes received</Text><Text style={{color:C.gold,fontSize:12,fontWeight:'700'}}>{userData?.dailyLikesEarned||0}/50</Text></View>
              <View style={s.progressBar}><View style={[s.progressFill,{width:`${Math.min(100,((userData?.dailyLikesEarned||0)/50)*100)}%`}]}/></View>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,marginBottom:4}}><Text style={{color:C.gray,fontSize:12}}>Daily matches</Text><Text style={{color:C.gold,fontSize:12,fontWeight:'700'}}>{userData?.dailyMatches||0}/3</Text></View>
              <View style={s.progressBar}><View style={[s.progressFill,{width:`${Math.min(100,((userData?.dailyMatches||0)/3)*100)}%`}]}/></View>
            </View>
          </>
        ) : (
          <View style={{flexDirection:'row',flexWrap:'wrap',gap:10}}>
            {SHOP.map(item=>(
              <TouchableOpacity key={item.id} style={s.shopItem} onPress={()=>buy(item)}>
                <Text style={{fontSize:32,marginBottom:6}}>{item.icon}</Text>
                <Text style={{color:C.white,fontWeight:'700',fontSize:13,marginBottom:2}}>{item.name}</Text>
                <Text style={{color:C.gold,fontSize:12,fontWeight:'700',marginBottom:2}}>{item.price} DLGG</Text>
                <Text style={{color:C.gray,fontSize:11,textAlign:'center'}}>{item.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      <Modal visible={wModal} transparent animationType="slide">
        <View style={s.modalOv}>
          <View style={s.modalSheet}>
            <View style={s.modalHandle}/>
            <Text style={s.cardTitle}>Withdraw $DLGG</Text>
            <Text style={{color:C.gray,fontSize:13,marginBottom:16}}>Min 100 DLGG • Wallet must be connected</Text>
            <TextInput style={s.inp} placeholder="Amount (min 100)" placeholderTextColor="#555" value={wAmt} onChangeText={setWAmt} keyboardType="numeric"/>
            <TouchableOpacity style={s.btn} onPress={withdraw}><Text style={s.btnText}>Withdraw</Text></TouchableOpacity>
            <TouchableOpacity style={[s.btnOut,{marginTop:10}]} onPress={()=>setWModal(false)}><Text style={s.btnOutTxt}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ─── PROFILE ─────────────────────────────────────────────
function ProfileScreen({ userData, reloadUser }) {
  const [walletModal, setWalletModal] = useState(false);
  const [walletAddr, setWalletAddr] = useState('');

  const logout = () => Alert.alert('Sign Out','Sure?',[{text:'Cancel',style:'cancel'},{text:'Sign Out',style:'destructive',onPress:()=>signOut(auth)}]);

  const saveWallet = async () => {
    if (!walletAddr||walletAddr.length<10) { Alert.alert('','Invalid address'); return; }
    const uid = auth.currentUser?.uid;
    try {
      await updateDoc(doc(db,'users',uid), {walletAddress:walletAddr});
      reloadUser(); setWalletModal(false);
      Alert.alert('✅','Wallet connected!');
    } catch(e){}
  };

  const init = (userData?.firstName||'?')[0].toUpperCase();

  return (
    <View style={s.flex}>
      <View style={s.nav}><Text style={s.navLogo}>GG</Text><Text style={s.navTitle}>Profile</Text><View style={{width:40}}/></View>
      <ScrollView contentContainerStyle={{padding:12}}>
        <View style={[s.card,{alignItems:'center',marginBottom:10}]}>
          <View style={[s.av,{width:80,height:80,borderRadius:40,marginBottom:12}]}><Text style={{color:'#000',fontWeight:'900',fontSize:32}}>{init}</Text></View>
          <Text style={{color:C.white,fontSize:22,fontWeight:'900',marginBottom:4}}>{userData?.firstName} {userData?.lastName}</Text>
          <Text style={{color:C.gray,fontSize:14,marginBottom:16}}>@{userData?.username}</Text>
          <View style={{flexDirection:'row',gap:0}}>
            {[{v:userData?.posts||0,l:'Posts'},{v:userData?.likesReceived||0,l:'Likes'},{v:(userData?.dlggEarned||0).toFixed(1),l:'Earned'}].map((st,i)=>(
              <View key={i} style={{alignItems:'center',paddingHorizontal:20,borderRightWidth:i<2?1:0,borderRightColor:C.border}}>
                <Text style={{color:C.gold,fontSize:20,fontWeight:'900'}}>{st.v}</Text>
                <Text style={{color:C.gray,fontSize:11,textTransform:'uppercase',letterSpacing:0.5}}>{st.l}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[s.balCard,{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}]}>
          <View>
            <Text style={{color:C.gray,fontSize:12,marginBottom:4}}>DLGG Balance</Text>
            <Text style={{color:C.gold,fontSize:22,fontWeight:'900'}}>{(userData?.dlggBalance||0).toFixed(2)} DLGG</Text>
          </View>
          <TouchableOpacity style={s.claimBtn} onPress={()=>setWalletModal(true)}>
            <Text style={{color:'#000',fontWeight:'700',fontSize:13}}>
              {userData?.walletAddress ? '🦊 '+userData.walletAddress.slice(0,6)+'...' : '🦊 Connect'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[s.card,{marginBottom:16}]}>
          {[
            {icon:'✏️',label:'Edit Profile'},
            {icon:'🔔',label:'Notifications'},
            {icon:'🦊',label:'Connect Wallet',onPress:()=>setWalletModal(true)},
            {icon:'🔒',label:'Security'},
            {icon:'📄',label:'Whitepaper'},
          ].map((item,i)=>(
            <TouchableOpacity key={i} style={[s.menuItem,i>0&&{borderTopWidth:1,borderTopColor:C.border}]} onPress={item.onPress}>
              <Text style={{fontSize:20,width:36}}>{item.icon}</Text>
              <Text style={{flex:1,color:C.white,fontSize:15,fontWeight:'500'}}>{item.label}</Text>
              <Text style={{color:C.gray,fontSize:20}}>›</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[s.menuItem,{borderTopWidth:1,borderTopColor:C.border}]} onPress={logout}>
            <Text style={{fontSize:20,width:36}}>🚪</Text>
            <Text style={{flex:1,color:C.red,fontSize:15,fontWeight:'500'}}>Sign Out</Text>
            <Text style={{color:C.gray,fontSize:20}}>›</Text>
          </TouchableOpacity>
        </View>
        <Text style={{textAlign:'center',color:'#444',fontSize:12,marginBottom:20}}>DoubleGG v1.0.0 | $DLGG on BNB Chain</Text>
      </ScrollView>

      <Modal visible={walletModal} transparent animationType="slide">
        <View style={s.modalOv}>
          <View style={s.modalSheet}>
            <View style={s.modalHandle}/>
            <Text style={s.cardTitle}>Connect Wallet</Text>
            <Text style={{color:C.gray,fontSize:13,marginBottom:16}}>Enter your MetaMask wallet address to receive $DLGG rewards</Text>
            <TextInput style={s.inp} placeholder="0x... wallet address" placeholderTextColor="#555" value={walletAddr} onChangeText={setWalletAddr} autoCapitalize="none" autoCorrect={false}/>
            <TouchableOpacity style={s.btn} onPress={saveWallet}><Text style={s.btnText}>Save Wallet</Text></TouchableOpacity>
            <TouchableOpacity style={[s.btnOut,{marginTop:10}]} onPress={()=>setWalletModal(false)}><Text style={s.btnOutTxt}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ─── BOTTOM TABS ─────────────────────────────────────────
const TABS = [
  {key:'feed',label:'Feed',icon:'🏠'},
  {key:'discover',label:'Discover',icon:'🔍'},
  {key:'wallet',label:'Wallet',icon:'💰'},
  {key:'profile',label:'Profile',icon:'👤'},
];

function MainApp() {
  const [tab, setTab] = useState('feed');
  const [userData, setUserData] = useState(null);

  useEffect(() => { loadUser(); }, []);

  const loadUser = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const snap = await getDoc(doc(db,'users',uid));
    if (snap.exists()) setUserData(snap.data());
  };

  return (
    <View style={s.flex}>
      <SafeAreaView style={{flex:1,backgroundColor:C.black}}>
        {tab==='feed' && <FeedScreen userData={userData} reloadUser={loadUser}/>}
        {tab==='discover' && <DiscoverScreen userData={userData}/>}
        {tab==='wallet' && <WalletScreen userData={userData} reloadUser={loadUser}/>}
        {tab==='profile' && <ProfileScreen userData={userData} reloadUser={loadUser}/>}
      </SafeAreaView>
      <View style={s.bottomNav}>
        {TABS.map(t=>(
          <TouchableOpacity key={t.key} style={s.navItem} onPress={()=>setTab(t.key)}>
            <Text style={{fontSize:22,color:tab===t.key?C.gold:C.gray}}>{t.icon}</Text>
            <Text style={{fontSize:10,color:tab===t.key?C.gold:C.gray,marginTop:3,fontWeight:'600',letterSpacing:0.5}}>{t.label.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ─── ROOT ─────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReg, setShowReg] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false); });
    return unsub;
  }, []);

  if (loading) return (
    <View style={[s.flex,{justifyContent:'center',alignItems:'center',backgroundColor:C.black}]}>
      <Text style={[s.logo,{marginBottom:20}]}>GG</Text>
      <ActivityIndicator color={C.gold} size="large"/>
    </View>
  );

  if (!user) return showReg
    ? <RegisterScreen onSwitch={()=>setShowReg(false)}/>
    : <LoginScreen onSwitch={()=>setShowReg(true)}/>;

  return <MainApp/>;
}

// ─── STYLES ──────────────────────────────────────────────
const s = StyleSheet.create({
  flex:{flex:1,backgroundColor:C.black},
  authWrap:{flexGrow:1,justifyContent:'center',padding:24},
  logo:{fontSize:36,fontWeight:'900',color:C.gold,letterSpacing:2,textAlign:'center',marginBottom:8},
  tagline:{fontSize:14,color:C.gray,textAlign:'center',marginBottom:32},
  card:{backgroundColor:C.card,borderRadius:20,padding:20,borderWidth:1,borderColor:C.border},
  cardTitle:{fontSize:22,fontWeight:'800',color:C.white,marginBottom:16},
  gold:{color:C.gold},
  lbl:{fontSize:12,color:C.gray,marginBottom:6,letterSpacing:0.5},
  inp:{backgroundColor:'rgba(255,255,255,0.05)',borderWidth:1,borderColor:C.border,borderRadius:12,padding:14,color:C.white,fontSize:15,marginBottom:14},
  btn:{backgroundColor:C.gold,borderRadius:12,padding:16,alignItems:'center',marginTop:4},
  btnText:{color:'#000',fontWeight:'800',fontSize:16},
  btnOut:{borderWidth:1,borderColor:C.border,borderRadius:12,padding:14,alignItems:'center'},
  btnOutTxt:{color:C.gold,fontWeight:'700',fontSize:14},
  sw:{textAlign:'center',marginTop:16,color:C.gray,fontSize:14},
  nav:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:16,paddingTop:16,backgroundColor:'rgba(8,8,8,0.95)',borderBottomWidth:1,borderBottomColor:C.border},
  navLogo:{fontSize:18,fontWeight:'900',color:C.gold,width:40},
  navTitle:{fontSize:16,fontWeight:'700',color:C.white},
  bottomNav:{flexDirection:'row',backgroundColor:'rgba(8,8,8,0.98)',borderTopWidth:1,borderTopColor:C.border,height:65},
  navItem:{flex:1,alignItems:'center',justifyContent:'center'},
  createBox:{backgroundColor:C.card,borderRadius:16,padding:12,marginBottom:12,borderWidth:1,borderColor:C.border,flexDirection:'row',alignItems:'flex-start',gap:10},
  av:{width:40,height:40,borderRadius:20,backgroundColor:C.gold,justifyContent:'center',alignItems:'center'},
  avTxt:{color:'#000',fontWeight:'800',fontSize:16},
  postInp:{flex:1,color:C.white,fontSize:14,minHeight:60,textAlignVertical:'top'},
  shareBtn:{backgroundColor:C.gold,borderRadius:8,paddingHorizontal:14,paddingVertical:8,alignSelf:'flex-end'},
  shareBtnTxt:{color:'#000',fontWeight:'700',fontSize:13},
  pCard:{backgroundColor:C.card,borderRadius:16,padding:14,marginBottom:10,borderWidth:1,borderColor:C.border},
  pHead:{flexDirection:'row',alignItems:'center',gap:10,marginBottom:10},
  pName:{color:C.white,fontWeight:'700',fontSize:14},
  pMeta:{color:C.gray,fontSize:12,marginTop:2},
  pTxt:{color:C.white,fontSize:14,lineHeight:20,marginBottom:12},
  actTxt:{color:C.gray,fontSize:13},
  empty:{alignItems:'center',padding:40},
  emptyTxt:{color:C.gray,fontSize:14,marginTop:12},
  tag:{backgroundColor:'rgba(255,215,0,0.08)',borderWidth:1,borderColor:'rgba(255,215,0,0.15)',borderRadius:20,paddingHorizontal:10,paddingVertical:4},
  tagTxt:{color:C.gold,fontSize:12},
  passBtn:{flex:1,backgroundColor:'rgba(255,82,82,0.1)',borderWidth:1,borderColor:'rgba(255,82,82,0.2)',borderRadius:12,padding:12,alignItems:'center'},
  connBtn:{flex:1,backgroundColor:C.gold,borderRadius:12,padding:12,alignItems:'center'},
  tab:{flex:1,padding:14,alignItems:'center'},
  tabActive:{borderBottomWidth:2,borderBottomColor:C.gold},
  tabTxt:{color:C.gray,fontWeight:'600',fontSize:14},
  dailyCard:{backgroundColor:'rgba(0,200,83,0.08)',borderWidth:1,borderColor:'rgba(0,200,83,0.2)',borderRadius:14,padding:14,marginBottom:10,flexDirection:'row',alignItems:'center'},
  claimBtn:{backgroundColor:C.green,borderRadius:8,paddingHorizontal:14,paddingVertical:8},
  balCard:{backgroundColor:'rgba(255,215,0,0.08)',borderWidth:1,borderColor:'rgba(255,215,0,0.25)',borderRadius:16,padding:16,marginBottom:10},
  statsCard:{backgroundColor:C.card,borderWidth:1,borderColor:C.border,borderRadius:14,padding:14,marginBottom:10},
  progressBar:{height:4,backgroundColor:'rgba(255,255,255,0.08)',borderRadius:2,overflow:'hidden'},
  progressFill:{height:'100%',backgroundColor:C.gold,borderRadius:2},
  shopItem:{backgroundColor:C.card,borderWidth:1,borderColor:C.border,borderRadius:14,padding:14,alignItems:'center',width:'47%'},
  modalOv:{flex:1,backgroundColor:'rgba(0,0,0,0.85)',justifyContent:'flex-end'},
  modalSheet:{backgroundColor:C.card,borderTopLeftRadius:20,borderTopRightRadius:20,padding:24,borderWidth:1,borderColor:C.border},
  modalHandle:{width:40,height:4,backgroundColor:'rgba(255,215,0,0.2)',borderRadius:2,alignSelf:'center',marginBottom:20},
  menuItem:{flexDirection:'row',alignItems:'center',padding:16},
});

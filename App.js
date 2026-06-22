import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, ScrollView, Alert, Modal, KeyboardAvoidingView,
  Platform, SafeAreaView
} from 'react-native';

const C = {
  black:'#080808', card:'#111111', gold:'#FFD700', gold2:'#FFA500',
  white:'#f5f5f5', gray:'#888', border:'rgba(255,215,0,0.12)',
  green:'#00c853', red:'#ff5252', purple:'#9b5cff', blue:'#2196F3',
};

const T = {
  en: {
    appName:'DOUBLEGG', taglineLogin:'Post. Vibe. Earn $DLGG 🏆', taglineRegister:'Join & Earn $DLGG 🎉',
    welcomeBack:'Welcome', back:'Back', createAccount:'Create', account:'Account',
    firstName:'First Name', lastName:'Last Name', username:'Username', email:'Email',
    phone:'Phone Number', password:'Password', passwordRepeat:'Repeat Password',
    signIn:'Sign In', signUp:'Sign Up', noAccount:"Don't have an account?", haveAccount:'Already have an account?',
    forgotPassword:'Forgot Password?', feed:'Feed', discover:'Discover', wallet:'Wallet', profile:'Profile', duel:'Duel',
    share:'Share', sharePlaceholder:'Share something...', pass:'Pass', connect:'Connect',
    dailyReward:'Daily Reward', dailyRewardSub:'+0.5 DLGG every day', claim:'Claim', claimed:'Claimed ✓',
    balance:'DLGG Balance', withdraw:'Withdraw', shop:'Shop',
    editProfile:'Edit Profile', notifications:'Notifications', connectWallet:'Connect Wallet', staking:'Staking', signOut:'Sign Out',
    wrongCredentials:'Please check your email and password.', fillAll:'Please fill in all fields.',
    passwordMin:'Password must be at least 6 characters.', passwordNoMatch:'Passwords do not match.',
    invalidPhone:'Please enter a valid phone number.',
    forgotTitle:'Forgot Password', forgotSub:'Enter your email or phone to receive a verification code.',
    sendCode:'Send Code', verifyCode:'Verify Code', enterCode:'Enter verification code',
    yourUsername:'Your username is:', newPassword:'New Password', resetPassword:'Reset Password', passwordReset:'Password reset successful!',
    noMoreProfiles:'No more profiles!', connected:'Connected!', limitReached:'Max 3 connects/day',
    purchased:'Purchased!', notEnoughDLGG:'Not enough DLGG', minWithdraw:'Minimum 100 DLGG',
    walletConnected:'Wallet connected!', invalidWallet:'Invalid wallet address.',
    saveProfile:'Save Profile', bio:'Bio', bioPlaceholder:'Tell us about yourself...', profileSaved:'Profile saved!',
    notifSaved:'Notification settings saved!', pushNotif:'Push Notifications', emailNotif:'Email Notifications', smsNotif:'SMS Notifications',
    save:'Save', cancel:'Cancel', back2:'Back', selectCountry:'Select Country Code',
    codeVerified:'Code verified!', wrongCode:'Wrong code. Try: 123456',
    earningRules:'📊 Earning Rules', earningText:'🎁 Daily login: +0.5 DLGG\n❤️ Receive likes: +0.1 DLGG (max 50/day)\n🔒 Staking: up to 30% rewards\n💸 Min withdrawal: 100 DLGG',
    withdrawTitle:'Withdraw $DLGG', withdrawSub:'Min 100 DLGG', submitted:'Submitted!', submittedMsg:'DLGG withdrawal submitted!',
    duelTitle:'⚔️ Duel Arena', activePlayers:'Active Players', games:'Games', selectGame:'Select Game', selectBet:'Select Bet',
    startDuel:'Start Duel', insufficientBalance:'Insufficient balance! Need', dlggRequired:'DLGG.',
    connectWalletFirst:'Connect your wallet to join duels!', quit:'Quit', quitConfirm:'You will lose the bet!',
    backToLobby:'Back to Lobby', rematch:'Rematch', youWon:'You Won!', youLost:'You Lost!', draw:'Draw!',
    yourTurn:'Your turn', opponentThinking:'Opponent thinking...', drawCard:'Draw Card', hit:'Hit', stand:'Stand',
    guess:'Guess!', guessHint:'Guess a number between 1-100', attempts:'Attempts',
  },
  tr: {
    appName:'DOUBLEGG', taglineLogin:'Paylaş. Etkileş. $DLGG Kazan 🏆', taglineRegister:'Katıl & $DLGG Kazan 🎉',
    welcomeBack:'Hoş', back:'Geldin', createAccount:'Hesap', account:'Oluştur',
    firstName:'İsim', lastName:'Soyisim', username:'Kullanıcı Adı', email:'E-posta',
    phone:'Telefon Numarası', password:'Şifre', passwordRepeat:'Şifre Tekrar',
    signIn:'Giriş Yap', signUp:'Kayıt Ol', noAccount:'Hesabın yok mu?', haveAccount:'Zaten hesabın var mı?',
    forgotPassword:'Şifremi Unuttum?', feed:'Akış', discover:'Keşfet', wallet:'Cüzdan', profile:'Profil', duel:'Düello',
    share:'Paylaş', sharePlaceholder:'Bir şeyler paylaş...', pass:'Geç', connect:'Bağlan',
    dailyReward:'Günlük Ödül', dailyRewardSub:'Her gün +0.5 DLGG', claim:'Al', claimed:'Alındı ✓',
    balance:'DLGG Bakiyesi', withdraw:'Çekim', shop:'Mağaza',
    editProfile:'Profili Düzenle', notifications:'Bildirimler', connectWallet:'Cüzdan Bağla', staking:'Staking', signOut:'Çıkış Yap',
    wrongCredentials:'Bilgilerinizi kontrol edin.', fillAll:'Lütfen tüm alanları doldurun.',
    passwordMin:'Şifre en az 6 karakter olmalı.', passwordNoMatch:'Şifreler eşleşmiyor.',
    invalidPhone:'Geçerli bir telefon numarası girin.',
    forgotTitle:'Şifremi Unuttum', forgotSub:'Doğrulama kodu almak için e-posta veya telefon girin.',
    sendCode:'Kod Gönder', verifyCode:'Kodu Doğrula', enterCode:'Doğrulama kodunu girin',
    yourUsername:'Kullanıcı adınız:', newPassword:'Yeni Şifre', resetPassword:'Şifreyi Sıfırla', passwordReset:'Şifre başarıyla sıfırlandı!',
    noMoreProfiles:'Başka profil yok!', connected:'Bağlantı Kuruldu!', limitReached:'Günlük max 3 bağlantı',
    purchased:'Satın Alındı!', notEnoughDLGG:'Yeterli DLGG yok', minWithdraw:'Minimum 100 DLGG',
    walletConnected:'Cüzdan bağlandı!', invalidWallet:'Geçersiz cüzdan adresi.',
    saveProfile:'Profili Kaydet', bio:'Hakkımda', bioPlaceholder:'Kendinizden bahsedin...', profileSaved:'Profil kaydedildi!',
    notifSaved:'Bildirim ayarları kaydedildi!', pushNotif:'Anlık Bildirimler', emailNotif:'E-posta Bildirimleri', smsNotif:'SMS Bildirimleri',
    save:'Kaydet', cancel:'İptal', back2:'Geri', selectCountry:'Ülke Kodu Seç',
    codeVerified:'Kod doğrulandı!', wrongCode:'Yanlış kod. Deneyin: 123456',
    earningRules:'📊 Kazanma Kuralları', earningText:"🎁 Günlük giriş: +0.5 DLGG\n❤️ Beğeni al: +0.1 DLGG (max 50/gün)\n🔒 Staking: %30'a kadar ödül\n💸 Min çekim: 100 DLGG",
    withdrawTitle:'$DLGG Çekim', withdrawSub:'Min 100 DLGG', submitted:'Gönderildi!', submittedMsg:'DLGG çekim talebi gönderildi!',
    duelTitle:'⚔️ Düello Arenası', activePlayers:'Aktif Oyuncular', games:'Oyunlar', selectGame:'Oyun Seç', selectBet:'Bahis Seç',
    startDuel:'Düelloyu Başlat', insufficientBalance:'Yetersiz bakiye! Gerekli:', dlggRequired:'DLGG.',
    connectWalletFirst:'Düelloya katılmak için cüzdanını bağla!', quit:'Çık', quitConfirm:'Bahsi kaybedeceksin!',
    backToLobby:'Lobiye Dön', rematch:'Tekrar', youWon:'Kazandın!', youLost:'Kaybettin!', draw:'Beraberlik!',
    yourTurn:'Senin sıran', opponentThinking:'Rakip düşünüyor...', drawCard:'Kart Çek', hit:'Kart Al', stand:'Dur',
    guess:'Tahmin Et!', guessHint:'1-100 arası bir sayı tah et', attempts:'Deneme',
  }
};

const COUNTRY_CODES = [
  {code:'+90',country:'🇹🇷 TR'},{code:'+1',country:'🇺🇸 US'},{code:'+44',country:'🇬🇧 UK'},
  {code:'+49',country:'🇩🇪 DE'},{code:'+33',country:'🇫🇷 FR'},{code:'+39',country:'🇮🇹 IT'},
  {code:'+34',country:'🇪🇸 ES'},{code:'+31',country:'🇳🇱 NL'},{code:'+7',country:'🇷🇺 RU'},
  {code:'+86',country:'🇨🇳 CN'},{code:'+81',country:'🇯🇵 JP'},{code:'+82',country:'🇰🇷 KR'},
  {code:'+91',country:'🇮🇳 IN'},{code:'+55',country:'🇧🇷 BR'},{code:'+52',country:'🇲🇽 MX'},
  {code:'+61',country:'🇦🇺 AU'},{code:'+966',country:'🇸🇦 SA'},{code:'+971',country:'🇦🇪 AE'},
  {code:'+20',country:'🇪🇬 EG'},{code:'+27',country:'🇿🇦 ZA'},
];

const MOCK_POSTS = [
  {id:'1',firstName:'Alex',lastName:'K',username:'alexk',text:'Just joined DoubleGG! Excited to earn $DLGG 🚀',likes:24,comments:5,time:'2h ago'},
  {id:'2',firstName:'Sarah',lastName:'M',username:'sarahm',text:'Loving this platform! Already earned 10 DLGG 💰',likes:41,comments:12,time:'4h ago'},
  {id:'3',firstName:'Mike',lastName:'R',username:'miker',text:'DoubleGG is the future of social media 🏆',likes:89,comments:23,time:'6h ago'},
];

const PROFILES = [
  {id:'1',name:'Luna T.',username:'lunat',bio:'Music & crypto 🎵',tags:['Music','Crypto'],emoji:'🎵'},
  {id:'2',name:'David S.',username:'davids',bio:'DeFi investor 🌐',tags:['DeFi','Web3'],emoji:'🌐'},
  {id:'3',name:'Emma W.',username:'emmaw',bio:'Content creator ✨',tags:['Content','Social'],emoji:'✨'},
];

const SHOP = [
  {id:'1',name:'Spotlight',price:10,icon:'🌟',desc:'Featured 24h'},
  {id:'2',name:'Super Like',price:2,icon:'💛',desc:'Stand out'},
  {id:'3',name:'Premium',price:50,icon:'💎',desc:'Exclusive/mo'},
  {id:'4',name:'Anonymous',price:20,icon:'🎭',desc:'Browse privately'},
  {id:'5',name:'Rose',price:5,icon:'🌹',desc:'Send a gift'},
  {id:'6',name:'Crown',price:15,icon:'👑',desc:'Royal gift'},
];

const BET_OPTIONS = [5, 10, 20, 50, 100, 200];

const GAMES = [
  {id:'rps',name:'Taş Kağıt Makas',nameEn:'Rock Paper Scissors',icon:'✂️',desc:'5 rounds • Strategy',descTr:'5 raund • Strateji'},
  {id:'card',name:'Yüksek Kart',nameEn:'High Card',icon:'🃏',desc:'Draw cards • Luck',descTr:'Kart çek • Şans'},
  {id:'blackjack',name:'Blackjack 21',nameEn:'Blackjack 21',icon:'🎰',desc:'Get closest to 21',descTr:"21'e en yakın ol"},
  {id:'guess',name:'Tahmin Et',nameEn:'Guess the Number',icon:'🎯',desc:'1-100 • Clues',descTr:'1-100 • İpucu'},
  {id:'ttt',name:'Tic-Tac-Toe',nameEn:'Tic-Tac-Toe',icon:'♟️',desc:'3x3 grid • Strategy',descTr:'3x3 ızgara • Strateji'},
];

const DUEL_PLAYERS = [
  {id:'1',name:'Alex K.',username:'alexk',emoji:'🔥',dlgg:150,wallet:'0x1234...5678'},
  {id:'2',name:'Sarah M.',username:'sarahm',emoji:'🎨',dlgg:320,wallet:'0x2345...6789'},
  {id:'3',name:'Mike R.',username:'miker',emoji:'💡',dlgg:89,wallet:'0x3456...7890'},
  {id:'4',name:'Luna T.',username:'lunat',emoji:'🎵',dlgg:540,wallet:'0x4567...8901'},
  {id:'5',name:'David S.',username:'davids',emoji:'🌐',dlgg:210,wallet:'0x5678...9012'},
];

// ─── LANG BUTTON ─────────────────────────────────────────
function LangButton({lang, setLang}) {
  return (
    <View style={s.langRow}>
      <TouchableOpacity style={[s.langBtn,lang==='en'&&s.langActive]} onPress={()=>setLang('en')}>
        <Text style={[s.langTxt,lang==='en'&&{color:'#000'}]}>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[s.langBtn,lang==='tr'&&s.langActive]} onPress={()=>setLang('tr')}>
        <Text style={[s.langTxt,lang==='tr'&&{color:'#000'}]}>TR</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── FORGOT PASSWORD ─────────────────────────────────────
function ForgotScreen({lang, onBack}) {
  const t = T[lang];
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');
  const [newPass, setNewPass] = useState('');

  const sendCode = () => {
    if (!contact) { Alert.alert('', t.fillAll); return; }
    Alert.alert('✅', 'Code sent! (Demo: 123456)');
    setStep(2);
  };
  const verifyCode = () => {
    if (code==='123456') { Alert.alert('✅', t.codeVerified); setStep(3); }
    else Alert.alert('❌', t.wrongCode);
  };
  const resetPass = () => {
    if (!newPass||newPass.length<6) { Alert.alert('', t.passwordMin); return; }
    Alert.alert('✅', t.passwordReset);
    onBack();
  };

  return (
    <KeyboardAvoidingView style={s.flex} behavior={Platform.OS==='ios'?'padding':'height'}>
      <ScrollView contentContainerStyle={s.authWrap} keyboardShouldPersistTaps="handled">
        <Text style={s.logo}>{t.appName}</Text>
        <View style={s.card}>
          <Text style={s.cardTitle}>{t.forgotTitle}</Text>
          <Text style={{color:C.gray,fontSize:13,marginBottom:16}}>{t.forgotSub}</Text>
          {step===1 && <>
            <Text style={s.lbl}>{t.email} / {t.phone}</Text>
            <TextInput style={s.inp} placeholder="email / phone" placeholderTextColor="#555" value={contact} onChangeText={setContact} autoCapitalize="none"/>
            <TouchableOpacity style={s.btn} onPress={sendCode}><Text style={s.btnText}>{t.sendCode}</Text></TouchableOpacity>
          </>}
          {step===2 && <>
            <Text style={s.lbl}>{t.enterCode}</Text>
            <TextInput style={s.inp} placeholder="123456" placeholderTextColor="#555" value={code} onChangeText={setCode} keyboardType="numeric"/>
            <TouchableOpacity style={s.btn} onPress={verifyCode}><Text style={s.btnText}>{t.verifyCode}</Text></TouchableOpacity>
          </>}
          {step===3 && <>
            <Text style={{color:C.gray,fontSize:13,marginBottom:4}}>{t.yourUsername}</Text>
            <Text style={{color:C.gold,fontSize:22,fontWeight:'900',marginBottom:16}}>@emrea</Text>
            <Text style={s.lbl}>{t.newPassword}</Text>
            <TextInput style={s.inp} placeholder="••••••••" placeholderTextColor="#555" value={newPass} onChangeText={setNewPass} secureTextEntry/>
            <TouchableOpacity style={s.btn} onPress={resetPass}><Text style={s.btnText}>{t.resetPassword}</Text></TouchableOpacity>
          </>}
          <TouchableOpacity onPress={onBack} style={{marginTop:12}}>
            <Text style={s.sw}><Text style={s.gold}>← {t.back2}</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── LOGIN ───────────────────────────────────────────────
function LoginScreen({lang, setLang, onLogin, onSwitch, onForgot}) {
  const t = T[lang];
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    setError('');
    if (!email||!pass) { setError(t.fillAll); return; }
    if (email!=='test@test.com'||pass!=='123456') { setError(t.wrongCredentials); return; }
    onLogin({firstName:'Emre',lastName:'A',username:'emrea',email,dlggBalance:5,dlggEarned:5,posts:0,likesReceived:0,walletAddress:null,bio:''});
  };

  return (
    <KeyboardAvoidingView style={s.flex} behavior={Platform.OS==='ios'?'padding':'height'}>
      <ScrollView contentContainerStyle={s.authWrap} keyboardShouldPersistTaps="handled">
        <LangButton lang={lang} setLang={setLang}/>
        <Text style={s.logo}>{t.appName}</Text>
        <Text style={s.tagline}>{t.taglineLogin}</Text>
        <View style={s.card}>
          <Text style={s.cardTitle}>{t.welcomeBack} <Text style={s.gold}>{t.back}</Text></Text>
          {!!error && <View style={s.errBox}><Text style={s.errTxt}>⚠️ {error}</Text></View>}
          <Text style={s.lbl}>{t.email}</Text>
          <TextInput style={s.inp} placeholder="your@email.com" placeholderTextColor="#555" value={email} onChangeText={v=>{setEmail(v);setError('');}} keyboardType="email-address" autoCapitalize="none"/>
          <Text style={s.lbl}>{t.password}</Text>
          <TextInput style={s.inp} placeholder="••••••••" placeholderTextColor="#555" value={pass} onChangeText={v=>{setPass(v);setError('');}} secureTextEntry/>
          <TouchableOpacity onPress={onForgot} style={{alignItems:'flex-end',marginBottom:12,marginTop:-6}}>
            <Text style={{color:C.gold,fontSize:13}}>{t.forgotPassword}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btn} onPress={login}><Text style={s.btnText}>{t.signIn}</Text></TouchableOpacity>
          <TouchableOpacity onPress={onSwitch}>
            <Text style={s.sw}>{t.noAccount} <Text style={s.gold}>{t.signUp}</Text></Text>
          </TouchableOpacity>
        </View>
        <Text style={{textAlign:'center',color:'#444',fontSize:11,marginTop:16}}>Demo: test@test.com / 123456</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── REGISTER ────────────────────────────────────────────
function RegisterScreen({lang, setLang, onLogin, onSwitch}) {
  const t = T[lang];
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+90');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [passRepeat, setPassRepeat] = useState('');
  const [error, setError] = useState('');
  const [countryModal, setCountryModal] = useState(false);

  const register = () => {
    setError('');
    if (!first||!last||!user||!email||!phone||!pass||!passRepeat) { setError(t.fillAll); return; }
    if (pass.length<6) { setError(t.passwordMin); return; }
    if (pass!==passRepeat) { setError(t.passwordNoMatch); return; }
    if (phone.length<7) { setError(t.invalidPhone); return; }
    onLogin({
      firstName: first||'User',
      lastName: last||'',
      username: user||'user',
      email: email||'',
      phone: countryCode+phone,
      dlggBalance: 5,
      dlggEarned: 5,
      posts: 0,
      likesReceived: 0,
      walletAddress: null,
      bio: '',
    });
    Alert.alert('🎉',`Welcome ${first}! +5 DLGG signup bonus!`);
  };
  return (
    <KeyboardAvoidingView style={s.flex} behavior={Platform.OS==='ios'?'padding':'height'}>
      <ScrollView contentContainerStyle={s.authWrap} keyboardShouldPersistTaps="handled">
        <LangButton lang={lang} setLang={setLang}/>
        <Text style={s.logo}>{t.appName}</Text>
        <Text style={s.tagline}>{t.taglineRegister}</Text>
        <View style={s.card}>
          <Text style={s.cardTitle}>{t.createAccount} <Text style={s.gold}>{t.account}</Text></Text>
          {!!error && <View style={s.errBox}><Text style={s.errTxt}>⚠️ {error}</Text></View>}
          <View style={{flexDirection:'row',gap:8}}>
            <View style={{flex:1}}><Text style={s.lbl}>{t.firstName}</Text><TextInput style={s.inp} placeholder="John" placeholderTextColor="#555" value={first} onChangeText={v=>{setFirst(v);setError('');}}/></View>
            <View style={{flex:1}}><Text style={s.lbl}>{t.lastName}</Text><TextInput style={s.inp} placeholder="Doe" placeholderTextColor="#555" value={last} onChangeText={v=>{setLast(v);setError('');}}/></View>
          </View>
          <Text style={s.lbl}>{t.username}</Text>
          <TextInput style={s.inp} placeholder="username" placeholderTextColor="#555" value={user} onChangeText={v=>{setUser(v);setError('');}} autoCapitalize="none"/>
          <Text style={s.lbl}>{t.email}</Text>
          <TextInput style={s.inp} placeholder="your@email.com" placeholderTextColor="#555" value={email} onChangeText={v=>{setEmail(v);setError('');}} keyboardType="email-address" autoCapitalize="none"/>
          <Text style={s.lbl}>{t.phone}</Text>
          <View style={{flexDirection:'row',gap:8,marginBottom:14}}>
            <TouchableOpacity style={[s.inp,{width:90,marginBottom:0,justifyContent:'center',alignItems:'center'}]} onPress={()=>setCountryModal(true)}>
              <Text style={{color:C.white,fontSize:14}}>{countryCode} ▼</Text>
            </TouchableOpacity>
            <TextInput style={[s.inp,{flex:1,marginBottom:0}]} placeholder="5321234567" placeholderTextColor="#555" value={phone} onChangeText={v=>{setPhone(v);setError('');}} keyboardType="phone-pad"/>
          </View>
          <Text style={s.lbl}>{t.password} (min. 6)</Text>
          <TextInput style={s.inp} placeholder="••••••••" placeholderTextColor="#555" value={pass} onChangeText={v=>{setPass(v);setError('');}} secureTextEntry/>
          <Text style={s.lbl}>{t.passwordRepeat}</Text>
          <TextInput style={s.inp} placeholder="••••••••" placeholderTextColor="#555" value={passRepeat} onChangeText={v=>{setPassRepeat(v);setError('');}} secureTextEntry/>
          <TouchableOpacity style={s.btn} onPress={register}><Text style={s.btnText}>{t.signUp} 🎉</Text></TouchableOpacity>
          <TouchableOpacity onPress={onSwitch}><Text style={s.sw}>{t.haveAccount} <Text style={s.gold}>{t.signIn}</Text></Text></TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={countryModal} transparent animationType="slide">
        <View style={s.modalOv}>
          <View style={[s.modalSheet,{maxHeight:'70%'}]}>
            <View style={s.modalHandle}/>
            <Text style={[s.cardTitle,{marginBottom:12}]}>{t.selectCountry}</Text>
            <ScrollView>{COUNTRY_CODES.map(c=>(
              <TouchableOpacity key={c.code} style={s.menuItem} onPress={()=>{setCountryCode(c.code);setCountryModal(false);}}>
                <Text style={{color:C.white,fontSize:15}}>{c.country} {c.code}</Text>
              </TouchableOpacity>
            ))}</ScrollView>
            <TouchableOpacity style={[s.btnOut,{marginTop:12}]} onPress={()=>setCountryModal(false)}><Text style={s.btnOutTxt}>{t.cancel}</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

// ─── FEED ────────────────────────────────────────────────
function FeedScreen({lang, userData, setUserData}) {
  const t = T[lang];
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [text, setText] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const [commentModal, setCommentModal] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState({});

  const share = () => {
    if (!text.trim()) return;
    setPosts([{id:Date.now().toString(),firstName:userData.firstName,lastName:userData.lastName,username:userData.username,text:text.trim(),likes:0,comments:0,time:'just now'},...posts]);
    setUserData(prev=>({...prev,posts:(prev.posts||0)+1}));
    setText('');
  };

  const openComments = (post) => {
    setActivePost(post);
    setCommentModal(true);
  };

  const addComment = () => {
    if (!commentText.trim() || !activePost) return;
    const newComment = {id:Date.now().toString(),username:userData.username,firstName:userData.firstName,text:commentText,time:'just now'};
    setPostComments(prev=>({...prev,[activePost.id]:[...(prev[activePost.id]||[]),newComment]}));
    setPosts(prev=>prev.map(p=>p.id===activePost.id?{...p,comments:p.comments+1}:p));
    setCommentText('');
  };

  const like = (postId, ownerUsername) => {
    if (likedPosts.includes(postId)) return;
    setPosts(prev=>prev.map(p=>p.id===postId?{...p,likes:p.likes+1}:p));
    setLikedPosts(prev=>[...prev,postId]);
    if (ownerUsername!==userData.username)
      setUserData(prev=>({...prev,dlggBalance:(prev.dlggBalance||0)+0.1,dlggEarned:(prev.dlggEarned||0)+0.1}));
  };

  if (showSearch) return <SearchScreen lang={lang} onClose={()=>setShowSearch(false)}/>;

  return (
    <View style={s.flex}>
      <View style={s.nav}>
        <Text style={s.navLogo}>GG</Text>
        <Text style={s.navTitle}>{t.feed}</Text>
        <TouchableOpacity onPress={()=>setShowSearch(true)}><Text style={{color:C.gold,fontSize:20}}>🔍</Text></TouchableOpacity>
      </View>
      <FlatList data={posts} keyExtractor={i=>i.id} contentContainerStyle={{padding:12}}
        ListHeaderComponent={
          <View style={s.createBox}>
            <View style={s.av}><Text style={s.avTxt}>{(userData && userData.firstName ? userData.firstName[0] : 'U')}</Text></View>
            <TextInput style={s.postInp} placeholder={t.sharePlaceholder} placeholderTextColor="#555" value={text} onChangeText={setText} multiline/>
            <TouchableOpacity style={s.shareBtn} onPress={share}><Text style={s.shareBtnTxt}>{t.share}</Text></TouchableOpacity>
          </View>
        }
        ListEmptyComponent={<View style={s.empty}><Text style={{fontSize:40}}>📝</Text></View>}
        renderItem={({item})=>(
          <View style={s.pCard}>
            <View style={s.pHead}>
              <View style={s.av}><Text style={s.avTxt}>{(item.firstName||'?')[0]}</Text></View>
              <View><Text style={s.pName}>{item.firstName} {item.lastName}</Text><Text style={s.pMeta}>@{item.username} · {item.time}</Text></View>
            </View>
            <Text style={s.pTxt}>{item.text}</Text>
            <View style={{flexDirection:'row',gap:16}}>
              <TouchableOpacity onPress={()=>like(item.id,item.username)}>
                <Text style={[s.actTxt,likedPosts.includes(item.id)&&{color:C.red}]}>❤️ {item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>openComments(item)}>
                <Text style={s.actTxt}>💬 {item.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={commentModal} transparent animationType="slide">
        <View style={s.modalOv}>
          <View style={[s.modalSheet,{maxHeight:'70%'}]}>
            <View style={s.modalHandle}/>
            <Text style={[s.cardTitle,{marginBottom:12}]}>💬 Comments</Text>
            <ScrollView style={{maxHeight:300}}>
              {(postComments[activePost?.id]||[]).length===0 ? (
                <Text style={{color:C.gray,textAlign:'center',padding:20}}>No comments yet. Be first!</Text>
              ) : (
                (postComments[activePost?.id]||[]).map(c=>(
                  <View key={c.id} style={{marginBottom:12,flexDirection:'row',gap:8}}>
                    <View style={[s.av,{width:32,height:32,borderRadius:16}]}><Text style={{color:'#000',fontSize:12,fontWeight:'800'}}>{(c.firstName||'?')[0]}</Text></View>
                    <View style={{flex:1,backgroundColor:'#1a1a1a',borderRadius:12,padding:10}}>
                      <Text style={{color:C.gold,fontSize:12,fontWeight:'700',marginBottom:2}}>@{c.username}</Text>
                      <Text style={{color:C.white,fontSize:13}}>{c.text}</Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
            <View style={{flexDirection:'row',gap:8,marginTop:12}}>
              <TextInput
                style={[s.inp,{flex:1,marginBottom:0,paddingVertical:10}]}
                placeholder="Write a comment..."
                placeholderTextColor="#555"
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity style={[s.claimBtn,{paddingHorizontal:16}]} onPress={addComment}>
                <Text style={{color:'#000',fontWeight:'700'}}>Send</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[s.btnOut,{marginTop:10}]} onPress={()=>{setCommentModal(false);setCommentText('');}}>
              <Text style={s.btnOutTxt}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ─── DISCOVER ────────────────────────────────────────────
function DiscoverScreen({lang}) {
  const t = T[lang];
  const [profiles, setProfiles] = useState(PROFILES);
  const [matches, setMatches] = useState(0);

  return (
    <View style={s.flex}>
      <View style={s.nav}><Text style={s.navLogo}>GG</Text><Text style={s.navTitle}>{t.discover}</Text><Text style={{color:C.gold,fontWeight:'700'}}>{matches}/3</Text></View>
      <ScrollView contentContainerStyle={{padding:12}}>
        {profiles.length===0
          ? <View style={s.empty}><Text style={{fontSize:40}}>🎉</Text><Text style={s.emptyTxt}>{t.noMoreProfiles}</Text></View>
          : profiles.map(p=>(
            <View key={p.id} style={[s.card,{alignItems:'center',marginBottom:12}]}>
              <Text style={{fontSize:50,marginBottom:10}}>{p.emoji}</Text>
              <Text style={{color:C.white,fontSize:18,fontWeight:'800',marginBottom:4}}>{p.name}</Text>
              <Text style={{color:C.gray,fontSize:13,marginBottom:10}}>@{p.username}</Text>
              <Text style={{color:'#aaa',fontSize:14,textAlign:'center',marginBottom:12}}>{p.bio}</Text>
              <View style={{flexDirection:'row',gap:6,marginBottom:16,flexWrap:'wrap',justifyContent:'center'}}>
                {p.tags.map(tag=><View key={tag} style={s.tag}><Text style={s.tagTxt}>{tag}</Text></View>)}
              </View>
              <View style={{flexDirection:'row',gap:10,width:'100%'}}>
                <TouchableOpacity style={s.passBtn} onPress={()=>setProfiles(prev=>prev.filter(x=>x.id!==p.id))}>
                  <Text style={{color:C.red,fontWeight:'700'}}>👎 {t.pass}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.connBtn} onPress={()=>{
                  if(matches>=3){Alert.alert('',t.limitReached);return;}
                  setMatches(m=>m+1);setProfiles(prev=>prev.filter(x=>x.id!==p.id));
                  Alert.alert('🤝',t.connected);
                }}>
                  <Text style={{color:'#000',fontWeight:'800'}}>🤝 {t.connect}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

// ─── WALLET ──────────────────────────────────────────────
function WalletScreen({lang, userData, setUserData}) {
  const t = T[lang];
  const [tab, setTab] = useState('wallet');
  const [wModal, setWModal] = useState(false);
  const [wAmt, setWAmt] = useState('');
  const [claimed, setClaimed] = useState(false);

  const claimDaily = () => {
    if (claimed) { Alert.alert('',t.claimed); return; }
    setUserData(prev=>({...prev,dlggBalance:(prev.dlggBalance||0)+0.5,dlggEarned:(prev.dlggEarned||0)+0.5}));
    setClaimed(true); Alert.alert('🎁','+0.5 DLGG!');
  };

  const buy = (item) => {
    if ((userData?.dlggBalance||0)<item.price) { Alert.alert('',t.notEnoughDLGG); return; }
    Alert.alert(item.name,`${item.price} DLGG?`,[
      {text:t.cancel,style:'cancel'},
      {text:'Buy',onPress:()=>{setUserData(prev=>({...prev,dlggBalance:(prev.dlggBalance||0)-item.price}));Alert.alert('✅',t.purchased);}}
    ]);
  };

  const doWithdraw = () => {
    const amt=parseFloat(wAmt);
    if (!amt||amt<100) { Alert.alert('',t.minWithdraw); return; }
    if (amt>(userData?.dlggBalance||0)) { Alert.alert('',t.notEnoughDLGG); return; }
    setUserData(prev=>({...prev,dlggBalance:(prev.dlggBalance||0)-amt}));
    setWModal(false); setWAmt('');
    Alert.alert('✅',`${amt} ${t.submittedMsg}`);
  };

  return (
    <View style={s.flex}>
      <View style={s.nav}><Text style={s.navLogo}>GG</Text><Text style={s.navTitle}>{t.wallet}</Text><View style={{width:40}}/></View>
      <View style={{flexDirection:'row',backgroundColor:C.card,borderBottomWidth:1,borderBottomColor:C.border}}>
        <TouchableOpacity style={[s.tab,tab==='wallet'&&s.tabActive]} onPress={()=>setTab('wallet')}><Text style={[s.tabTxt,tab==='wallet'&&{color:C.gold}]}>💰 {t.wallet}</Text></TouchableOpacity>
        <TouchableOpacity style={[s.tab,tab==='shop'&&s.tabActive]} onPress={()=>setTab('shop')}><Text style={[s.tabTxt,tab==='shop'&&{color:C.gold}]}>🛒 {t.shop}</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{padding:12}}>
        {tab==='wallet' ? (<>
          <View style={s.dailyCard}>
            <Text style={{fontSize:28}}>🎁</Text>
            <View style={{flex:1,marginLeft:12}}><Text style={{color:C.white,fontWeight:'700'}}>{t.dailyReward}</Text><Text style={{color:C.gray,fontSize:12}}>{t.dailyRewardSub}</Text></View>
            <TouchableOpacity style={[s.claimBtn,claimed&&{opacity:0.4}]} onPress={claimDaily} disabled={claimed}>
              <Text style={{color:'#000',fontWeight:'700'}}>{claimed?t.claimed:t.claim}</Text>
            </TouchableOpacity>
          </View>
          <View style={s.balCard}>
            <Text style={{color:C.gray,fontSize:12,marginBottom:4}}>{t.balance}</Text>
            <Text style={{color:C.gold,fontSize:38,fontWeight:'900'}}>{(userData?.dlggBalance||0).toFixed(2)}</Text>
            <Text style={{color:C.gray,fontSize:12,marginBottom:16}}>≈ ${((userData?.dlggBalance||0)*0.0000015).toFixed(6)} USD</Text>
            <View style={{flexDirection:'row',gap:10}}>
              <TouchableOpacity style={s.btn} onPress={()=>setWModal(true)}><Text style={s.btnText}>💸 {t.withdraw}</Text></TouchableOpacity>
              <TouchableOpacity style={s.btnOut} onPress={()=>setTab('shop')}><Text style={s.btnOutTxt}>🛒 {t.shop}</Text></TouchableOpacity>
            </View>
          </View>
          <View style={s.statsCard}>
            <Text style={{color:C.gold,fontWeight:'700',marginBottom:8}}>{t.earningRules}</Text>
            <Text style={{color:C.gray,fontSize:13,lineHeight:22}}>{t.earningText}</Text>
          </View>
        </>) : (
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
            <Text style={s.cardTitle}>{t.withdrawTitle}</Text>
            <Text style={{color:C.gray,fontSize:13,marginBottom:8}}>{t.withdrawSub}</Text>
            <Text style={{color:C.gray,fontSize:13,marginBottom:12}}>{t.balance}: <Text style={{color:C.gold,fontWeight:'700'}}>{(userData?.dlggBalance||0).toFixed(2)} DLGG</Text></Text>
            <TextInput style={s.inp} placeholder="100" placeholderTextColor="#555" value={wAmt} onChangeText={setWAmt} keyboardType="numeric"/>
            <TouchableOpacity style={s.btn} onPress={doWithdraw}><Text style={s.btnText}>{t.withdraw}</Text></TouchableOpacity>
            <TouchableOpacity style={[s.btnOut,{marginTop:10}]} onPress={()=>setWModal(false)}><Text style={s.btnOutTxt}>{t.cancel}</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ─── EDIT PROFILE ────────────────────────────────────────
function EditProfileScreen({lang, userData, setUserData, onBack}) {
  const t = T[lang];
  const [first, setFirst] = useState(userData.firstName||'');
  const [last, setLast] = useState(userData.lastName||'');
  const [username, setUsername] = useState(userData.username||'');
  const [bio, setBio] = useState(userData.bio||'');

  const save = () => {
    setUserData(prev=>({...prev,firstName:first,lastName:last,username,bio}));
    Alert.alert('✅',t.profileSaved);
    onBack();
  };

  return (
    <KeyboardAvoidingView style={s.flex} behavior={Platform.OS==='ios'?'padding':'height'}>
      <View style={s.nav}>
        <TouchableOpacity onPress={onBack}><Text style={{color:C.gold,fontSize:15}}>← {t.back2}</Text></TouchableOpacity>
        <Text style={s.navTitle}>{t.editProfile}</Text>
        <View style={{width:60}}/>
      </View>
      <ScrollView contentContainerStyle={{padding:16}} keyboardShouldPersistTaps="handled">
        <View style={[s.card,{alignItems:'center',marginBottom:16}]}>
          <View style={[s.av,{width:80,height:80,borderRadius:40,marginBottom:8}]}>
            <Text style={{color:'#000',fontWeight:'900',fontSize:32}}>{(first||'?')[0]}</Text>
          </View>
          <Text style={{color:C.gold,fontSize:13,marginTop:4}}>📷 Add Photo (Coming Soon)</Text>
        </View>
        <Text style={s.lbl}>{t.firstName}</Text>
        <TextInput style={s.inp} value={first} onChangeText={setFirst} placeholderTextColor="#555"/>
        <Text style={s.lbl}>{t.lastName}</Text>
        <TextInput style={s.inp} value={last} onChangeText={setLast} placeholderTextColor="#555"/>
        <Text style={s.lbl}>{t.username}</Text>
        <TextInput style={s.inp} value={username} onChangeText={setUsername} autoCapitalize="none" placeholderTextColor="#555"/>
        <Text style={s.lbl}>{t.bio}</Text>
        <TextInput style={[s.inp,{minHeight:80,textAlignVertical:'top'}]} value={bio} onChangeText={setBio} placeholder={t.bioPlaceholder} placeholderTextColor="#555" multiline/>
        <TouchableOpacity style={s.btn} onPress={save}><Text style={s.btnText}>{t.saveProfile}</Text></TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
// ─── NOTIFICATIONS ───────────────────────────────────────
function NotificationsScreen({lang, onBack}) {
  const t = T[lang];
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);

  return (
    <View style={s.flex}>
      <View style={s.nav}>
        <TouchableOpacity onPress={onBack}><Text style={{color:C.gold,fontSize:15}}>← {t.back2}</Text></TouchableOpacity>
        <Text style={s.navTitle}>{t.notifications}</Text>
        <View style={{width:60}}/>
      </View>
      <ScrollView contentContainerStyle={{padding:16}}>
        <View style={s.card}>
          {[{label:t.pushNotif,val:push,set:setPush},{label:t.emailNotif,val:email,set:setEmail},{label:t.smsNotif,val:sms,set:setSms}].map((item,i)=>(
            <View key={i} style={[s.menuItem,i>0&&{borderTopWidth:1,borderTopColor:C.border}]}>
              <Text style={{flex:1,color:C.white,fontSize:15}}>{item.label}</Text>
              <TouchableOpacity style={[s.toggle,item.val&&s.toggleOn]} onPress={()=>item.set(v=>!v)}>
                <View style={[s.toggleThumb,item.val&&s.toggleThumbOn]}/>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={[s.btn,{marginTop:16}]} onPress={()=>{Alert.alert('✅',t.notifSaved);onBack();}}>
          <Text style={s.btnText}>{t.save}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ─── WALLET CONNECT ──────────────────────────────────────
function WalletConnectScreen({lang, userData, setUserData, onBack}) {
  const t = T[lang];
  const [addr, setAddr] = useState(userData.walletAddress||'');

  const save = () => {
    if (!addr||addr.length<10) { Alert.alert('',t.invalidWallet); return; }
    setUserData(prev=>({...prev,walletAddress:addr}));
    Alert.alert('✅',t.walletConnected);
    onBack();
  };

  return (
    <KeyboardAvoidingView style={s.flex} behavior={Platform.OS==='ios'?'padding':'height'}>
      <View style={s.nav}>
        <TouchableOpacity onPress={onBack}><Text style={{color:C.gold,fontSize:15}}>← {t.back2}</Text></TouchableOpacity>
        <Text style={s.navTitle}>{t.connectWallet}</Text>
        <View style={{width:60}}/>
      </View>
      <ScrollView contentContainerStyle={{padding:16}} keyboardShouldPersistTaps="handled">
        <View style={[s.balCard,{marginBottom:16}]}>
          <Text style={{color:C.gray,fontSize:13,marginBottom:8}}>🦊 MetaMask</Text>
          <Text style={{color:C.white,fontSize:14,lineHeight:20}}>
            {lang==='tr'?'MetaMask cüzdanınızı bağlayın. Kazandığınız DLGG tokenler otomatik cüzdanınıza aktarılacaktır.':'Connect your MetaMask wallet. Earned DLGG tokens will be automatically sent to your wallet.'}
          </Text>
        </View>
        {!!userData.walletAddress && (
          <View style={[s.statsCard,{marginBottom:16}]}>
            <Text style={{color:C.gray,fontSize:12,marginBottom:4}}>Connected:</Text>
            <Text style={{color:C.green,fontSize:13}}>{userData.walletAddress}</Text>
          </View>
        )}
        <Text style={s.lbl}>Wallet Address</Text>
        <TextInput style={s.inp} placeholder="0x..." placeholderTextColor="#555" value={addr} onChangeText={setAddr} autoCapitalize="none" autoCorrect={false}/>
        <TouchableOpacity style={s.btn} onPress={save}><Text style={s.btnText}>🦊 {t.connectWallet}</Text></TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── PROFILE ─────────────────────────────────────────────
function ProfileScreen({lang, userData, setUserData, onLogout}) {
  const t = T[lang];
  const [screen, setScreen] = useState(null);
  const init = (userData && userData.firstName ? userData.firstName[0] : 'U').toUpperCase();

  if (screen==='edit') return <EditProfileScreen lang={lang} userData={userData} setUserData={setUserData} onBack={()=>setScreen(null)}/>;
  if (screen==='notif') return <NotificationsScreen lang={lang} onBack={()=>setScreen(null)}/>
  if (screen==='notifs') return <NotifScreen lang={lang}/>;
  if (screen==='wallet') return <WalletConnectScreen lang={lang} userData={userData} setUserData={setUserData} onBack={()=>setScreen(null)}/>;

  return (
    <View style={s.flex}>
      <View style={s.nav}><Text style={s.navLogo}>GG</Text><Text style={s.navTitle}>{t.profile}</Text><View style={{width:40}}/></View>
      <ScrollView contentContainerStyle={{padding:12}}>
        <View style={[s.card,{alignItems:'center',marginBottom:10}]}>
          <View style={[s.av,{width:80,height:80,borderRadius:40,marginBottom:12}]}>
            <Text style={{color:'#000',fontWeight:'900',fontSize:32}}>{init}</Text>
          </View>
          <Text style={{color:C.white,fontSize:22,fontWeight:'900',marginBottom:4}}>{userData?.firstName} {userData?.lastName}</Text>
          <Text style={{color:C.gray,fontSize:14,marginBottom:4}}>@{userData?.username}</Text>
          {!!userData?.bio && <Text style={{color:'#aaa',fontSize:13,textAlign:'center',marginBottom:8}}>{userData.bio}</Text>}
          <View style={{flexDirection:'row'}}>
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
            <Text style={{color:C.gray,fontSize:12,marginBottom:4}}>{t.balance}</Text>
            <Text style={{color:C.gold,fontSize:22,fontWeight:'900'}}>{(userData?.dlggBalance||0).toFixed(2)} DLGG</Text>
          </View>
          <TouchableOpacity style={s.claimBtn} onPress={()=>setScreen('wallet')}>
            <Text style={{color:'#000',fontWeight:'700',fontSize:13}}>
              {userData?.walletAddress?'🦊 '+userData.walletAddress.slice(0,6)+'...':'🦊 '+t.connectWallet}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[s.card,{marginBottom:16}]}>
          {[
            {icon:'✏️',label:t.editProfile,onPress:()=>setScreen('edit')},
            {icon:'🔔',label:t.notifications,onPress:()=>setScreen('notifs')},
            {icon:'🦊',label:t.connectWallet,onPress:()=>setScreen('wallet')},
            {icon:'🔒',label:t.staking,onPress:()=>Alert.alert('Staking','doubleggtoken.github.io/DoubleGG/staking.html')},
          ].map((item,i)=>(
            <TouchableOpacity key={i} style={[s.menuItem,i>0&&{borderTopWidth:1,borderTopColor:C.border}]} onPress={item.onPress}>
              <Text style={{fontSize:20,width:36}}>{item.icon}</Text>
              <Text style={{flex:1,color:C.white,fontSize:15,fontWeight:'500'}}>{item.label}</Text>
              <Text style={{color:C.gray,fontSize:20}}>›</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[s.menuItem,{borderTopWidth:1,borderTopColor:C.border}]} onPress={()=>Alert.alert(t.signOut,'',[{text:t.cancel,style:'cancel'},{text:t.signOut,style:'destructive',onPress:onLogout}])}>
            <Text style={{fontSize:20,width:36}}>🚪</Text>
            <Text style={{flex:1,color:C.red,fontSize:15,fontWeight:'500'}}>{t.signOut}</Text>
            <Text style={{color:C.gray,fontSize:20}}>›</Text>
          </TouchableOpacity>
        </View>
        <Text style={{textAlign:'center',color:'#444',fontSize:12,marginBottom:20}}>DoubleGG v1.0.0 | $DLGG on BNB Chain</Text>
      </ScrollView>
    </View>
  );
}


// ─── MESSAGES ────────────────────────────────────────────
const MOCK_CONVERSATIONS = [
  {id:'1',name:'Alex K.',username:'alexk',emoji:'🔥',lastMsg:'Hey! Great duel 😄',time:'2m',unread:2},
  {id:'2',name:'Sarah M.',username:'sarahm',emoji:'🎨',lastMsg:'Thanks for connecting!',time:'1h',unread:0},
  {id:'3',name:'Luna T.',username:'lunat',emoji:'🎵',lastMsg:'Want to duel again?',time:'3h',unread:1},
];

function ChatScreen({conv, userData, onBack}) {
  const [msgs, setMsgs] = useState([
    {id:'1',from:'them',text:'Hey! Great duel 😄',time:'10:30'},
    {id:'2',from:'me',text:'Thanks! You played well too 🔥',time:'10:31'},
    {id:'3',from:'them',text:'Want to play again sometime?',time:'10:32'},
  ]);
  const [msg, setMsg] = useState('');

  const send = () => {
    if (!msg.trim()) return;
    setMsgs(prev=>[...prev,{id:Date.now().toString(),from:'me',text:msg,time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}]);
    setMsg('');
  };

  return (
    <View style={s.flex}>
      <View style={s.nav}>
        <TouchableOpacity onPress={onBack}><Text style={{color:C.gold,fontSize:15}}>← Back</Text></TouchableOpacity>
        <View style={{alignItems:'center'}}>
          <Text style={{color:C.white,fontWeight:'700',fontSize:15}}>{conv.name}</Text>
          <Text style={{color:C.green,fontSize:11}}>● Online</Text>
        </View>
        <View style={{width:60}}/>
      </View>
      <FlatList
        data={msgs}
        keyExtractor={i=>i.id}
        contentContainerStyle={{padding:12}}
        renderItem={({item})=>(
          <View style={{alignItems:item.from==='me'?'flex-end':'flex-start',marginBottom:8}}>
            <View style={{
              backgroundColor:item.from==='me'?C.gold:'#1a1a1a',
              borderRadius:16,
              borderBottomRightRadius:item.from==='me'?4:16,
              borderBottomLeftRadius:item.from==='me'?16:4,
              padding:10,maxWidth:'75%',
              borderWidth:item.from==='me'?0:1,
              borderColor:C.border
            }}>
              <Text style={{color:item.from==='me'?'#000':C.white,fontSize:14}}>{item.text}</Text>
            </View>
            <Text style={{color:C.gray,fontSize:10,marginTop:3}}>{item.time}</Text>
          </View>
        )}
      />
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'}>
        <View style={{flexDirection:'row',gap:8,padding:12,backgroundColor:C.card,borderTopWidth:1,borderTopColor:C.border}}>
          <TextInput
            style={[s.inp,{flex:1,marginBottom:0,paddingVertical:10}]}
            placeholder="Message..."
            placeholderTextColor="#555"
            value={msg}
            onChangeText={setMsg}
          />
          <TouchableOpacity style={[s.claimBtn,{paddingHorizontal:16}]} onPress={send}>
            <Text style={{color:'#000',fontWeight:'700',fontSize:16}}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function MessagesScreen({lang, userData}) {
  const t = T[lang];
  const [activeChat, setActiveChat] = useState(null);
  const [convs, setConvs] = useState(MOCK_CONVERSATIONS);

  if (activeChat) return <ChatScreen conv={activeChat} userData={userData} onBack={()=>setActiveChat(null)}/>;

  return (
    <View style={s.flex}>
      <View style={s.nav}>
        <Text style={s.navLogo}>GG</Text>
        <Text style={s.navTitle}>💬 {lang==='tr'?'Mesajlar':'Messages'}</Text>
        <View style={{width:40}}/>
      </View>
      <ScrollView contentContainerStyle={{padding:12}}>
        {convs.map(conv=>(
          <TouchableOpacity key={conv.id} style={[s.pCard,{flexDirection:'row',alignItems:'center',gap:12}]} onPress={()=>setActiveChat(conv)}>
            <View style={[s.av,{width:50,height:50,borderRadius:25}]}>
              <Text style={{fontSize:22}}>{conv.emoji}</Text>
            </View>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:4}}>
                <Text style={{color:C.white,fontWeight:'700',fontSize:15}}>{conv.name}</Text>
                <Text style={{color:C.gray,fontSize:12}}>{conv.time}</Text>
              </View>
              <Text style={{color:C.gray,fontSize:13}} numberOfLines={1}>{conv.lastMsg}</Text>
            </View>
            {conv.unread>0 && (
              <View style={{backgroundColor:C.gold,borderRadius:10,width:20,height:20,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#000',fontSize:11,fontWeight:'700'}}>{conv.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
        {convs.length===0 && (
          <View style={s.empty}>
            <Text style={{fontSize:40}}>💬</Text>
            <Text style={s.emptyTxt}>{lang==='tr'?'Henüz mesajın yok':'No messages yet'}</Text>
            <Text style={{color:C.gray,fontSize:13,textAlign:'center',marginTop:8}}>{lang==='tr'?"Discover'da biriyle bağlan!":'Connect with someone in Discover!'}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
// ─── SEARCH & PROFILE VIEW ───────────────────────────────
const SEARCH_USERS = [
  {id:'1',name:'Alex K.',username:'alexk',emoji:'🔥',bio:'Crypto enthusiast 🚀',posts:24,dlgg:150},
  {id:'2',name:'Sarah M.',username:'sarahm',emoji:'🎨',bio:'Digital artist 🎨',posts:41,dlgg:320},
  {id:'3',name:'Mike R.',username:'miker',emoji:'💡',bio:'Web3 builder 💡',posts:12,dlgg:89},
  {id:'4',name:'Luna T.',username:'lunat',emoji:'🎵',bio:'Music & crypto 🎵',posts:67,dlgg:540},
  {id:'5',name:'David S.',username:'davids',emoji:'🌐',bio:'DeFi investor 🌐',posts:33,dlgg:210},
];

function UserProfileView({user, onBack, lang}) {
  const [followed, setFollowed] = useState(false);
  return (
    <View style={s.flex}>
      <View style={s.nav}>
        <TouchableOpacity onPress={onBack}><Text style={{color:C.gold,fontSize:15}}>← Back</Text></TouchableOpacity>
        <Text style={s.navTitle}>Profile</Text>
        <View style={{width:60}}/>
      </View>
      <ScrollView contentContainerStyle={{padding:12}}>
        <View style={[s.card,{alignItems:'center',marginBottom:12}]}>
          <View style={[s.av,{width:80,height:80,borderRadius:40,marginBottom:12}]}>
            <Text style={{fontSize:36}}>{user.emoji}</Text>
          </View>
          <Text style={{color:C.white,fontSize:22,fontWeight:'900',marginBottom:4}}>{user.name}</Text>
          <Text style={{color:C.gray,fontSize:14,marginBottom:8}}>@{user.username}</Text>
          <Text style={{color:'#aaa',fontSize:14,textAlign:'center',marginBottom:16}}>{user.bio}</Text>
          <View style={{flexDirection:'row',marginBottom:16}}>
            {[{v:user.posts,l:'Posts'},{v:user.dlgg,l:'DLGG'},{v:'🟢',l:'Online'}].map((st,i)=>(
              <View key={i} style={{alignItems:'center',paddingHorizontal:20,borderRightWidth:i<2?1:0,borderRightColor:C.border}}>
                <Text style={{color:C.gold,fontSize:20,fontWeight:'900'}}>{st.v}</Text>
                <Text style={{color:C.gray,fontSize:11,textTransform:'uppercase'}}>{st.l}</Text>
              </View>
            ))}
          </View>
          <View style={{flexDirection:'row',gap:10,width:'100%'}}>
            <TouchableOpacity style={[s.btn,{flex:1}]} onPress={()=>setFollowed(f=>!f)}>
              <Text style={s.btnText}>{followed?'✓ Following':'+ Follow'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.btnOut,{flex:1}]}>
              <Text style={s.btnOutTxt}>💬 Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SearchScreen({lang, onClose}) {
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const filtered = SEARCH_USERS.filter(u=>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  if (selectedUser) return <UserProfileView user={selectedUser} onBack={()=>setSelectedUser(null)} lang={lang}/>;

  return (
    <View style={s.flex}>
      <View style={s.nav}>
        <TouchableOpacity onPress={()=>onClose&&onClose()}><Text style={{color:C.gold,fontSize:15}}>← Back</Text></TouchableOpacity>
        <Text style={s.navTitle}>🔍 {lang==='tr'?'Ara':'Search'}</Text>
        <View style={{width:60}}/>
      </View>
      <View style={{padding:12}}>
        <TextInput
          style={[s.inp,{marginBottom:0}]}
          placeholder={lang==='tr'?'Kullanıcı ara...':'Search users...'}
          placeholderTextColor="#555"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={i=>i.id}
        contentContainerStyle={{padding:12}}
        ListEmptyComponent={<View style={s.empty}><Text style={{fontSize:40}}>🔍</Text><Text style={s.emptyTxt}>{lang==='tr'?'Kullanıcı bulunamadı':'No users found'}</Text></View>}
        renderItem={({item})=>(
          <TouchableOpacity style={[s.pCard,{flexDirection:'row',alignItems:'center',gap:12}]} onPress={()=>setSelectedUser(item)}>
            <View style={[s.av,{width:50,height:50,borderRadius:25}]}>
              <Text style={{fontSize:22}}>{item.emoji}</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{color:C.white,fontWeight:'700',fontSize:15}}>{item.name}</Text>
              <Text style={{color:C.gray,fontSize:12}}>@{item.username}</Text>
              <Text style={{color:'#aaa',fontSize:12}} numberOfLines={1}>{item.bio}</Text>
            </View>
            <Text style={{color:C.gold,fontSize:20}}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ─── NOTIFICATIONS SCREEN ────────────────────────────────
const MOCK_NOTIFS = [
  {id:'1',type:'like',text:'Alex K. liked your post',time:'2m ago',emoji:'❤️',read:false},
  {id:'2',type:'comment',text:'Sarah M. commented: "Great post!"',time:'15m ago',emoji:'💬',read:false},
  {id:'3',type:'match',text:'You matched with Luna T.',time:'1h ago',emoji:'🤝',read:true},
  {id:'4',type:'duel',text:'Mike R. challenged you to a duel!',time:'2h ago',emoji:'⚔️',read:true},
  {id:'5',type:'like',text:'David S. liked your post',time:'3h ago',emoji:'❤️',read:true},
  {id:'6',type:'dlgg',text:'+0.5 DLGG daily reward claimed',time:'5h ago',emoji:'🎁',read:true},
  {id:'7',type:'duel',text:'You won 10 DLGG in duel vs Alex K.',time:'1d ago',emoji:'🏆',read:true},
];

function NotifScreen({lang}) {
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const markAll = () => setNotifs(prev=>prev.map(n=>({...n,read:true})));

  return (
    <View style={s.flex}>
      <View style={s.nav}>
        <Text style={s.navLogo}>GG</Text>
        <Text style={s.navTitle}>🔔 {lang==='tr'?'Bildirimler':'Notifications'}</Text>
        <TouchableOpacity onPress={markAll}><Text style={{color:C.gold,fontSize:12}}>All read</Text></TouchableOpacity>
      </View>
      <FlatList
        data={notifs}
        keyExtractor={i=>i.id}
        contentContainerStyle={{padding:12}}
        renderItem={({item})=>(
          <TouchableOpacity
            style={[s.pCard,{flexDirection:'row',alignItems:'center',gap:12,backgroundColor:item.read?C.card:'#1a1500'}]}
            onPress={()=>setNotifs(prev=>prev.map(n=>n.id===item.id?{...n,read:true}:n))}
          >
            <Text style={{fontSize:28}}>{item.emoji}</Text>
            <View style={{flex:1}}>
              <Text style={{color:C.white,fontSize:14,fontWeight:item.read?'400':'700'}}>{item.text}</Text>
              <Text style={{color:C.gray,fontSize:12,marginTop:2}}>{item.time}</Text>
            </View>
            {!item.read && <View style={{width:8,height:8,borderRadius:4,backgroundColor:C.gold}}/>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ─── DUEL GAMES ──────────────────────────────────────────
const CARD_SUITS=['♠️','♥️','♦️','♣️'];
const CARD_VALS=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const getHCCard=()=>{const v=Math.floor(Math.random()*13);const s=CARD_SUITS[Math.floor(Math.random()*4)];return{val:CARD_VALS[v],suit:s,num:v};};
const getBJCard=()=>{const v=CARD_VALS[Math.floor(Math.random()*13)];const su=CARD_SUITS[Math.floor(Math.random()*4)];const n=v==='A'?11:Math.min(parseInt(v)||10,10);return{val:v,suit:su,num:n};};
const sumCards=(cards)=>{let s=cards.reduce((a,c)=>a+c.num,0);cards.forEach(c=>{if(c.val==='A'&&s>21)s-=10;});return s;};
function ChatBox({chat, setChat, username}) {
  const [msg, setMsg] = useState('');
  const send = () => {
    if (!msg.trim()) return;
    setChat(prev=>[...prev,{id:Date.now().toString(),user:username,text:msg}]);
    setMsg('');
  };
  return (
    <View style={s.chatBox}>
      <FlatList data={chat} keyExtractor={i=>i.id} style={{maxHeight:100}}
        renderItem={({item})=>(
          <Text style={s.chatMsg}><Text style={{color:C.gold,fontWeight:'700'}}>{item.user}: </Text>{item.text}</Text>
        )}/>
      <View style={s.chatInput}>
        <TextInput style={s.chatInp} placeholder="Message..." placeholderTextColor="#555" value={msg} onChangeText={setMsg}/>
        <TouchableOpacity style={s.chatSend} onPress={send}><Text style={{color:'#000',fontWeight:'700'}}>Send</Text></TouchableOpacity>
      </View>
    </View>
  );
}

function Scoreboard({player, opponent, pScore, oScore, bet}) {
  return (
    <View style={s.scoreboard}>
      <View style={s.scoreBox}>
        <Text style={s.scoreEmoji}>{player.emoji||'👤'}</Text>
        <Text style={s.scoreName}>You</Text>
        <Text style={s.scoreVal}>{pScore}</Text>
      </View>
      <View style={s.vsBox}>
        <Text style={s.vsTxt}>VS</Text>
        <Text style={{color:C.gold,fontSize:12}}>{bet} DLGG</Text>
      </View>
      <View style={s.scoreBox}>
        <Text style={s.scoreEmoji}>{opponent.emoji}</Text>
        <Text style={s.scoreName}>{opponent.name.split(' ')[0]}</Text>
        <Text style={s.scoreVal}>{oScore}</Text>
      </View>
    </View>
  );
}

function RPSGame({bet, player, opponent, onEnd}) {
  const [round, setRound] = useState(1);
  const [pScore, setPScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [pChoice, setPChoice] = useState(null);
  const [oChoice, setOChoice] = useState(null);
  const [result, setResult] = useState('');
  const [chat, setChat] = useState([{id:'1',user:'System',text:`Duel started! Bet: ${bet} DLGG`}]);
  const choices = ['🪨','📄','✂️'];
  const names = ['Rock','Paper','Scissors'];

  const play = (choice) => {
    const oIdx = Math.floor(Math.random()*3);
    const oC = choices[oIdx];
    const pIdx = choices.indexOf(choice);
    setPChoice(choice); setOChoice(oC);
    let res = '';
    let newPS = pScore, newOS = oScore;
    if (pIdx===oIdx) res='Draw!';
    else if ((pIdx===0&&oIdx===2)||(pIdx===1&&oIdx===0)||(pIdx===2&&oIdx===1)) { res='You Win! 🎉'; newPS=pScore+1; setPScore(newPS); }
    else { res='Opponent Wins!'; newOS=oScore+1; setOScore(newOS); }
    setResult(res);
    setChat(prev=>[...prev,{id:Date.now().toString(),user:'System',text:`Round ${round}: ${choice} vs ${oC} → ${res}`}]);
    if (round>=5) {
      setTimeout(()=>onEnd(newPS>newOS?'win':newPS<newOS?'lose':'draw'),1500);
    } else {
      setTimeout(()=>{ setPChoice(null);setOChoice(null);setResult('');setRound(r=>r+1); },1500);
    }
  };

  return (
    <View style={s.flex}>
      <View style={s.gameHeader}><Text style={s.gameTitle}>✂️ Rock Paper Scissors</Text><Text style={s.roundTxt}>Round {round}/5</Text></View>
      <Scoreboard player={player} opponent={opponent} pScore={pScore} oScore={oScore} bet={bet}/>
      {pChoice ? (
        <View style={s.resultBox}>
          <Text style={s.choiceRow}>{pChoice} vs {oChoice}</Text>
          <Text style={s.resultTxt}>{result}</Text>
        </View>
      ) : (
        <View style={s.choicesRow}>
          {choices.map((c,i)=>(
            <TouchableOpacity key={i} style={s.choiceBtn} onPress={()=>play(c)}>
              <Text style={{fontSize:40}}>{c}</Text>
              <Text style={{color:C.gray,fontSize:12,marginTop:4}}>{names[i]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <ChatBox chat={chat} setChat={setChat} username={player.username}/>
    </View>
  );
}

function HighCardGame({bet, player, opponent, onEnd}) {
  const [round, setRound] = useState(1);
  const [pScore, setPScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [pCard, setPCard] = useState(null);
  const [oCard, setOCard] = useState(null);
  const [result, setResult] = useState('');
  const [chat, setChat] = useState([{id:'1',user:'System',text:`High Card! Bet: ${bet} DLGG`}]);

  const draw = () => {
    const pc=getHCCard(), oc=getHCCard();
    setPCard(pc); setOCard(oc);
    let res='',newPS=pScore,newOS=oScore;
    if(pc.num>oc.num){res='You Win! 🎉';newPS=pScore+1;setPScore(newPS);}
    else if(pc.num<oc.num){res='Opponent Wins!';newOS=oScore+1;setOScore(newOS);}
    else res='Draw!';
    setResult(res);
    setChat(prev=>[...prev,{id:Date.now().toString(),user:'System',text:`Round ${round}: ${pc.val}${pc.suit} vs ${oc.val}${oc.suit} → ${res}`}]);
    if(round>=5){setTimeout(()=>onEnd(newPS>newOS?'win':newPS<newOS?'lose':'draw'),1500);}
    else{setTimeout(()=>{setPCard(null);setOCard(null);setResult('');setRound(r=>r+1);},1500);}
  };

  return (
    <View style={s.flex}>
      <View style={s.gameHeader}><Text style={s.gameTitle}>🃏 High Card</Text><Text style={s.roundTxt}>Round {round}/5</Text></View>
      <Scoreboard player={player} opponent={opponent} pScore={pScore} oScore={oScore} bet={bet}/>
      {pCard ? (
        <View style={s.resultBox}>
          <View style={{flexDirection:'row',justifyContent:'center',gap:30,marginBottom:12}}>
            <View style={s.playingCard}><Text style={s.cardVal}>{pCard.val}</Text><Text style={s.cardSuit}>{pCard.suit}</Text></View>
            <View style={s.playingCard}><Text style={s.cardVal}>{oCard.val}</Text><Text style={s.cardSuit}>{oCard.suit}</Text></View>
          </View>
          <Text style={s.resultTxt}>{result}</Text>
        </View>
      ) : (
        <TouchableOpacity style={s.drawBtn} onPress={draw}>
          <Text style={{fontSize:50}}>🃏</Text>
          <Text style={{color:C.gold,fontSize:18,fontWeight:'700',marginTop:8}}>Draw Card</Text>
        </TouchableOpacity>
      )}
      <ChatBox chat={chat} setChat={setChat} username={player.username}/>
    </View>
  );
}

function BlackjackGame({bet, player, opponent, onEnd}) {
  const [pCards, setPCards] = useState(()=>[getBJCard(),getBJCard()]);
  const [oCards, setOCards] = useState(()=>[getBJCard(),getBJCard()]);
  const [phase, setPhase] = useState('player');
  const [chat, setChat] = useState([{id:'1',user:'System',text:`Blackjack! Bet: ${bet} DLGG`}]);
  const pSum=sumCards(pCards);

  const hit=()=>{
    const nc=[...pCards,getBJCard()];
    setPCards(nc);
    if(sumCards(nc)>21){setPhase('end');setTimeout(()=>onEnd('lose'),500);}
  };

  const stand=()=>{
    let dc=[...oCards];
    while(sumCards(dc)<17)dc=[...dc,getBJCard()];
    setOCards(dc);setPhase('end');
    const ps=sumCards(pCards),ds=sumCards(dc);
    setTimeout(()=>onEnd(ds>21||ps>ds?'win':ps<ds?'lose':'draw'),500);
  };

  return (
    <View style={s.flex}>
      <View style={s.gameHeader}><Text style={s.gameTitle}>🎰 Blackjack 21</Text><Text style={s.roundTxt}>{bet} DLGG</Text></View>
      <ScrollView contentContainerStyle={{padding:12}}>
        <View style={[s.card,{marginBottom:12}]}>
          <Text style={{color:C.gray,fontSize:12,marginBottom:8}}>Opponent: {phase==='end'?sumCards(oCards):'?'}</Text>
          <View style={{flexDirection:'row',gap:8,flexWrap:'wrap'}}>
            {oCards.map((c,i)=>(
              <View key={i} style={s.playingCard}>
                {phase==='end'||i===0?<><Text style={s.cardVal}>{c.val}</Text><Text style={s.cardSuit}>{c.suit}</Text></>:<Text style={{fontSize:24}}>🂠</Text>}
              </View>
            ))}
          </View>
        </View>
        <View style={[s.card,{marginBottom:12}]}>
          <Text style={{color:C.gold,fontSize:12,marginBottom:8}}>Your cards: {pSum}</Text>
          <View style={{flexDirection:'row',gap:8,flexWrap:'wrap'}}>
            {pCards.map((c,i)=><View key={i} style={s.playingCard}><Text style={s.cardVal}>{c.val}</Text><Text style={s.cardSuit}>{c.suit}</Text></View>)}
          </View>
        </View>
        {phase==='player'&&(
          <View style={{flexDirection:'row',gap:10}}>
            <TouchableOpacity style={[s.gameBtn,{flex:1,backgroundColor:C.green}]} onPress={hit}><Text style={{color:'#000',fontWeight:'800',fontSize:16}}>Hit 👆</Text></TouchableOpacity>
            <TouchableOpacity style={[s.gameBtn,{flex:1,backgroundColor:C.red}]} onPress={stand}><Text style={{color:'#fff',fontWeight:'800',fontSize:16}}>Stand ✋</Text></TouchableOpacity>
          </View>
        )}
        <ChatBox chat={chat} setChat={setChat} username={player.username}/>
      </ScrollView>
    </View>
  );
}

function GuessGame({bet, player, opponent, onEnd}) {
  const [secret] = useState(Math.floor(Math.random()*100)+1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('');
  const [oAttempts] = useState(Math.floor(Math.random()*5)+3);
  const [chat, setChat] = useState([{id:'1',user:'System',text:`Guess 1-100! Bet: ${bet} DLGG`}]);

  const makeGuess=()=>{
    const g=parseInt(guess);
    if(!g||g<1||g>100){Alert.alert('','Enter 1-100');return;}
    const na=attempts+1;setAttempts(na);
    if(g===secret){
      setHint('🎉 Correct!');
      setChat(prev=>[...prev,{id:Date.now().toString(),user:'System',text:`Found in ${na} attempts! Opponent: ${oAttempts}.`}]);
      setTimeout(()=>onEnd(na<=oAttempts?'win':'lose'),1500);
    } else {
      const h=g<secret?'📈 Too low!':'📉 Too high!';
      setHint(h);
      setChat(prev=>[...prev,{id:Date.now().toString(),user:'System',text:`${g} → ${h}`}]);
      if(na>=10)setTimeout(()=>onEnd('lose'),1000);
    }
    setGuess('');
  };
        // ─── SEARCH & PROFILE VIEW ───────────────────────────────
const SEARCH_USERS = [
  {id:'1',name:'Alex K.',username:'alexk',emoji:'🔥',bio:'Crypto enthusiast 🚀',posts:24,dlgg:150},
  {id:'2',name:'Sarah M.',username:'sarahm',emoji:'🎨',bio:'Digital artist 🎨',posts:41,dlgg:320},
  {id:'3',name:'Mike R.',username:'miker',emoji:'💡',bio:'Web3 builder 💡',posts:12,dlgg:89},
  {id:'4',name:'Luna T.',username:'lunat',emoji:'🎵',bio:'Music & crypto 🎵',posts:67,dlgg:540},
  {id:'5',name:'David S.',username:'davids',emoji:'🌐',bio:'DeFi investor 🌐',posts:33,dlgg:210},
];

function UserProfileView({user, onBack, lang}) {
  const [followed, setFollowed] = useState(false);
  return (
    <View style={s.flex}>
      <View style={s.nav}>
        <TouchableOpacity onPress={onBack}><Text style={{color:C.gold,fontSize:15}}>← Back</Text></TouchableOpacity>
        <Text style={s.navTitle}>Profile</Text>
        <View style={{width:60}}/>
      </View>
      <ScrollView contentContainerStyle={{padding:12}}>
        <View style={[s.card,{alignItems:'center',marginBottom:12}]}>
          <View style={[s.av,{width:80,height:80,borderRadius:40,marginBottom:12}]}>
            <Text style={{fontSize:36}}>{user.emoji}</Text>
          </View>
          <Text style={{color:C.white,fontSize:22,fontWeight:'900',marginBottom:4}}>{user.name}</Text>
          <Text style={{color:C.gray,fontSize:14,marginBottom:8}}>@{user.username}</Text>
          <Text style={{color:'#aaa',fontSize:14,textAlign:'center',marginBottom:16}}>{user.bio}</Text>
          <View style={{flexDirection:'row',marginBottom:16}}>
            {[{v:user.posts,l:'Posts'},{v:user.dlgg,l:'DLGG'},{v:'🟢',l:'Online'}].map((st,i)=>(
              <View key={i} style={{alignItems:'center',paddingHorizontal:20,borderRightWidth:i<2?1:0,borderRightColor:C.border}}>
                <Text style={{color:C.gold,fontSize:20,fontWeight:'900'}}>{st.v}</Text>
                <Text style={{color:C.gray,fontSize:11,textTransform:'uppercase'}}>{st.l}</Text>
              </View>
            ))}
          </View>
          <View style={{flexDirection:'row',gap:10,width:'100%'}}>
            <TouchableOpacity style={[s.btn,{flex:1}]} onPress={()=>setFollowed(f=>!f)}>
              <Text style={s.btnText}>{followed?'✓ Following':'+ Follow'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.btnOut,{flex:1}]}>
              <Text style={s.btnOutTxt}>💬 Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function SearchScreen({lang, onClose}) {
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const filtered = SEARCH_USERS.filter(u=>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  if (selectedUser) return <UserProfileView user={selectedUser} onBack={()=>setSelectedUser(null)} lang={lang}/>;

  return (
    <View style={s.flex}>
      <View style={s.nav}>
        <TouchableOpacity onPress={()=>onClose&&onClose()}><Text style={{color:C.gold,fontSize:15}}>← Back</Text></TouchableOpacity>
        <Text style={s.navTitle}>🔍 {lang==='tr'?'Ara':'Search'}</Text>
        <View style={{width:60}}/>
      </View>
      <View style={{padding:12}}>
        <TextInput
          style={[s.inp,{marginBottom:0}]}
          placeholder={lang==='tr'?'Kullanıcı ara...':'Search users...'}
          placeholderTextColor="#555"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={i=>i.id}
        contentContainerStyle={{padding:12}}
        ListEmptyComponent={<View style={s.empty}><Text style={{fontSize:40}}>🔍</Text><Text style={s.emptyTxt}>{lang==='tr'?'Kullanıcı bulunamadı':'No users found'}</Text></View>}
        renderItem={({item})=>(
          <TouchableOpacity style={[s.pCard,{flexDirection:'row',alignItems:'center',gap:12}]} onPress={()=>setSelectedUser(item)}>
            <View style={[s.av,{width:50,height:50,borderRadius:25}]}>
              <Text style={{fontSize:22}}>{item.emoji}</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{color:C.white,fontWeight:'700',fontSize:15}}>{item.name}</Text>
              <Text style={{color:C.gray,fontSize:12}}>@{item.username}</Text>
              <Text style={{color:'#aaa',fontSize:12}} numberOfLines={1}>{item.bio}</Text>
            </View>
            <Text style={{color:C.gold,fontSize:20}}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ─── NOTIFICATIONS SCREEN ────────────────────────────────
const MOCK_NOTIFS = [
  {id:'1',type:'like',text:'Alex K. liked your post',time:'2m ago',emoji:'❤️',read:false},
  {id:'2',type:'comment',text:'Sarah M. commented: "Great post!"',time:'15m ago',emoji:'💬',read:false},
  {id:'3',type:'match',text:'You matched with Luna T.',time:'1h ago',emoji:'🤝',read:true},
  {id:'4',type:'duel',text:'Mike R. challenged you to a duel!',time:'2h ago',emoji:'⚔️',read:true},
  {id:'5',type:'like',text:'David S. liked your post',time:'3h ago',emoji:'❤️',read:true},
  {id:'6',type:'dlgg',text:'+0.5 DLGG daily reward claimed',time:'5h ago',emoji:'🎁',read:true},
  {id:'7',type:'duel',text:'You won 10 DLGG in duel vs Alex K.',time:'1d ago',emoji:'🏆',read:true},
];

function NotifScreen({lang}) {
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);
  const markAll = () => setNotifs(prev=>prev.map(n=>({...n,read:true})));

  return (
    <View style={s.flex}>
      <View style={s.nav}>
        <Text style={s.navLogo}>GG</Text>
        <Text style={s.navTitle}>🔔 {lang==='tr'?'Bildirimler':'Notifications'}</Text>
        <TouchableOpacity onPress={markAll}><Text style={{color:C.gold,fontSize:12}}>All read</Text></TouchableOpacity>
      </View>
      <FlatList
        data={notifs}
        keyExtractor={i=>i.id}
        contentContainerStyle={{padding:12}}
        renderItem={({item})=>(
          <TouchableOpacity
            style={[s.pCard,{flexDirection:'row',alignItems:'center',gap:12,backgroundColor:item.read?C.card:'#1a1500'}]}
            onPress={()=>setNotifs(prev=>prev.map(n=>n.id===item.id?{...n,read:true}:n))}
          >
            <Text style={{fontSize:28}}>{item.emoji}</Text>
            <View style={{flex:1}}>
              <Text style={{color:C.white,fontSize:14,fontWeight:item.read?'400':'700'}}>{item.text}</Text>
              <Text style={{color:C.gray,fontSize:12,marginTop:2}}>{item.time}</Text>
            </View>
            {!item.read && <View style={{width:8,height:8,borderRadius:4,backgroundColor:C.gold}}/>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ─── DUEL GAMES ──────────────────────────────────────────
const CARD_SUITS=['♠️','♥️','♦️','♣️'];
const CARD_VALS=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const getHCCard=()=>{const v=Math.floor(Math.random()*13);const s=CARD_SUITS[Math.floor(Math.random()*4)];return{val:CARD_VALS[v],suit:s,num:v};};
const getBJCard=()=>{const v=CARD_VALS[Math.floor(Math.random()*13)];const su=CARD_SUITS[Math.floor(Math.random()*4)];const n=v==='A'?11:Math.min(parseInt(v)||10,10);return{val:v,suit:su,num:n};};
const sumCards=(cards)=>{let s=cards.reduce((a,c)=>a+c.num,0);cards.forEach(c=>{if(c.val==='A'&&s>21)s-=10;});return s;};
function ChatBox({chat, setChat, username}) {
  const [msg, setMsg] = useState('');
  const send = () => {
    if (!msg.trim()) return;
    setChat(prev=>[...prev,{id:Date.now().toString(),user:username,text:msg}]);
    setMsg('');
  };
  return (
    <View style={s.chatBox}>
      <FlatList data={chat} keyExtractor={i=>i.id} style={{maxHeight:100}}
        renderItem={({item})=>(
          <Text style={s.chatMsg}><Text style={{color:C.gold,fontWeight:'700'}}>{item.user}: </Text>{item.text}</Text>
        )}/>
      <View style={s.chatInput}>
        <TextInput style={s.chatInp} placeholder="Message..." placeholderTextColor="#555" value={msg} onChangeText={setMsg}/>
        <TouchableOpacity style={s.chatSend} onPress={send}><Text style={{color:'#000',fontWeight:'700'}}>Send</Text></TouchableOpacity>
      </View>
    </View>
  );
}

function Scoreboard({player, opponent, pScore, oScore, bet}) {
  return (
    <View style={s.scoreboard}>
      <View style={s.scoreBox}>
        <Text style={s.scoreEmoji}>{player.emoji||'👤'}</Text>
        <Text style={s.scoreName}>You</Text>
        <Text style={s.scoreVal}>{pScore}</Text>
      </View>
      <View style={s.vsBox}>
        <Text style={s.vsTxt}>VS</Text>
        <Text style={{color:C.gold,fontSize:12}}>{bet} DLGG</Text>
      </View>
      <View style={s.scoreBox}>
        <Text style={s.scoreEmoji}>{opponent.emoji}</Text>
        <Text style={s.scoreName}>{opponent.name.split(' ')[0]}</Text>
        <Text style={s.scoreVal}>{oScore}</Text>
      </View>
    </View>
  );
}

function RPSGame({bet, player, opponent, onEnd}) {
  const [round, setRound] = useState(1);
  const [pScore, setPScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [pChoice, setPChoice] = useState(null);
  const [oChoice, setOChoice] = useState(null);
  const [result, setResult] = useState('');
  const [chat, setChat] = useState([{id:'1',user:'System',text:`Duel started! Bet: ${bet} DLGG`}]);
  const choices = ['🪨','📄','✂️'];
  const names = ['Rock','Paper','Scissors'];

  const play = (choice) => {
    const oIdx = Math.floor(Math.random()*3);
    const oC = choices[oIdx];
    const pIdx = choices.indexOf(choice);
    setPChoice(choice); setOChoice(oC);
    let res = '';
    let newPS = pScore, newOS = oScore;
    if (pIdx===oIdx) res='Draw!';
    else if ((pIdx===0&&oIdx===2)||(pIdx===1&&oIdx===0)||(pIdx===2&&oIdx===1)) { res='You Win! 🎉'; newPS=pScore+1; setPScore(newPS); }
    else { res='Opponent Wins!'; newOS=oScore+1; setOScore(newOS); }
    setResult(res);
    setChat(prev=>[...prev,{id:Date.now().toString(),user:'System',text:`Round ${round}: ${choice} vs ${oC} → ${res}`}]);
    if (round>=5) {
      setTimeout(()=>onEnd(newPS>newOS?'win':newPS<newOS?'lose':'draw'),1500);
    } else {
      setTimeout(()=>{ setPChoice(null);setOChoice(null);setResult('');setRound(r=>r+1); },1500);
    }
  };

  return (
    <View style={s.flex}>
      <View style={s.gameHeader}><Text style={s.gameTitle}>✂️ Rock Paper Scissors</Text><Text style={s.roundTxt}>Round {round}/5</Text></View>
      <Scoreboard player={player} opponent={opponent} pScore={pScore} oScore={oScore} bet={bet}/>
      {pChoice ? (
        <View style={s.resultBox}>
          <Text style={s.choiceRow}>{pChoice} vs {oChoice}</Text>
          <Text style={s.resultTxt}>{result}</Text>
        </View>
      ) : (
        <View style={s.choicesRow}>
          {choices.map((c,i)=>(
            <TouchableOpacity key={i} style={s.choiceBtn} onPress={()=>play(c)}>
              <Text style={{fontSize:40}}>{c}</Text>
              <Text style={{color:C.gray,fontSize:12,marginTop:4}}>{names[i]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <ChatBox chat={chat} setChat={setChat} username={player.username}/>
    </View>
  );
}

function HighCardGame({bet, player, opponent, onEnd}) {
  const [round, setRound] = useState(1);
  const [pScore, setPScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [pCard, setPCard] = useState(null);
  const [oCard, setOCard] = useState(null);
  const [result, setResult] = useState('');
  const [chat, setChat] = useState([{id:'1',user:'System',text:`High Card! Bet: ${bet} DLGG`}]);

  const draw = () => {
    const pc=getHCCard(), oc=getHCCard();
    setPCard(pc); setOCard(oc);
    let res='',newPS=pScore,newOS=oScore;
    if(pc.num>oc.num){res='You Win! 🎉';newPS=pScore+1;setPScore(newPS);}
    else if(pc.num<oc.num){res='Opponent Wins!';newOS=oScore+1;setOScore(newOS);}
    else res='Draw!';
    setResult(res);
    setChat(prev=>[...prev,{id:Date.now().toString(),user:'System',text:`Round ${round}: ${pc.val}${pc.suit} vs ${oc.val}${oc.suit} → ${res}`}]);
    if(round>=5){setTimeout(()=>onEnd(newPS>newOS?'win':newPS<newOS?'lose':'draw'),1500);}
    else{setTimeout(()=>{setPCard(null);setOCard(null);setResult('');setRound(r=>r+1);},1500);}
  };

  return (
    <View style={s.flex}>
      <View style={s.gameHeader}><Text style={s.gameTitle}>🃏 High Card</Text><Text style={s.roundTxt}>Round {round}/5</Text></View>
      <Scoreboard player={player} opponent={opponent} pScore={pScore} oScore={oScore} bet={bet}/>
      {pCard ? (
        <View style={s.resultBox}>
          <View style={{flexDirection:'row',justifyContent:'center',gap:30,marginBottom:12}}>
            <View style={s.playingCard}><Text style={s.cardVal}>{pCard.val}</Text><Text style={s.cardSuit}>{pCard.suit}</Text></View>
            <View style={s.playingCard}><Text style={s.cardVal}>{oCard.val}</Text><Text style={s.cardSuit}>{oCard.suit}</Text></View>
          </View>
          <Text style={s.resultTxt}>{result}</Text>
        </View>
      ) : (
        <TouchableOpacity style={s.drawBtn} onPress={draw}>
          <Text style={{fontSize:50}}>🃏</Text>
          <Text style={{color:C.gold,fontSize:18,fontWeight:'700',marginTop:8}}>Draw Card</Text>
        </TouchableOpacity>
      )}
      <ChatBox chat={chat} setChat={setChat} username={player.username}/>
    </View>
  );
}

function BlackjackGame({bet, player, opponent, onEnd}) {
  const [pCards, setPCards] = useState(()=>[getBJCard(),getBJCard()]);
  const [oCards, setOCards] = useState(()=>[getBJCard(),getBJCard()]);
  const [phase, setPhase] = useState('player');
  const [chat, setChat] = useState([{id:'1',user:'System',text:`Blackjack! Bet: ${bet} DLGG`}]);
  const pSum=sumCards(pCards);

  const hit=()=>{
    const nc=[...pCards,getBJCard()];
    setPCards(nc);
    if(sumCards(nc)>21){setPhase('end');setTimeout(()=>onEnd('lose'),500);}
  };

  const stand=()=>{
    let dc=[...oCards];
    while(sumCards(dc)<17)dc=[...dc,getBJCard()];
    setOCards(dc);setPhase('end');
    const ps=sumCards(pCards),ds=sumCards(dc);
    setTimeout(()=>onEnd(ds>21||ps>ds?'win':ps<ds?'lose':'draw'),500);
  };

  return (
    <View style={s.flex}>
      <View style={s.gameHeader}><Text style={s.gameTitle}>🎰 Blackjack 21</Text><Text style={s.roundTxt}>{bet} DLGG</Text></View>
      <ScrollView contentContainerStyle={{padding:12}}>
        <View style={[s.card,{marginBottom:12}]}>
          <Text style={{color:C.gray,fontSize:12,marginBottom:8}}>Opponent: {phase==='end'?sumCards(oCards):'?'}</Text>
          <View style={{flexDirection:'row',gap:8,flexWrap:'wrap'}}>
            {oCards.map((c,i)=>(
              <View key={i} style={s.playingCard}>
                {phase==='end'||i===0?<><Text style={s.cardVal}>{c.val}</Text><Text style={s.cardSuit}>{c.suit}</Text></>:<Text style={{fontSize:24}}>🂠</Text>}
              </View>
            ))}
          </View>
        </View>
        <View style={[s.card,{marginBottom:12}]}>
          <Text style={{color:C.gold,fontSize:12,marginBottom:8}}>Your cards: {pSum}</Text>
          <View style={{flexDirection:'row',gap:8,flexWrap:'wrap'}}>
            {pCards.map((c,i)=><View key={i} style={s.playingCard}><Text style={s.cardVal}>{c.val}</Text><Text style={s.cardSuit}>{c.suit}</Text></View>)}
          </View>
        </View>
        {phase==='player'&&(
          <View style={{flexDirection:'row',gap:10}}>
            <TouchableOpacity style={[s.gameBtn,{flex:1,backgroundColor:C.green}]} onPress={hit}><Text style={{color:'#000',fontWeight:'800',fontSize:16}}>Hit 👆</Text></TouchableOpacity>
            <TouchableOpacity style={[s.gameBtn,{flex:1,backgroundColor:C.red}]} onPress={stand}><Text style={{color:'#fff',fontWeight:'800',fontSize:16}}>Stand ✋</Text></TouchableOpacity>
          </View>
        )}
        <ChatBox chat={chat} setChat={setChat} username={player.username}/>
      </ScrollView>
    </View>
  );
}

function GuessGame({bet, player, opponent, onEnd}) {
  const [secret] = useState(Math.floor(Math.random()*100)+1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('');
  const [oAttempts] = useState(Math.floor(Math.random()*5)+3);
  const [chat, setChat] = useState([{id:'1',user:'System',text:`Guess 1-100! Bet: ${bet} DLGG`}]);

  const makeGuess=()=>{
    const g=parseInt(guess);
    if(!g||g<1||g>100){Alert.alert('','Enter 1-100');return;}
    const na=attempts+1;setAttempts(na);
    if(g===secret){
      setHint('🎉 Correct!');
      setChat(prev=>[...prev,{id:Date.now().toString(),user:'System',text:`Found in ${na} attempts! Opponent: ${oAttempts}.`}]);
      setTimeout(()=>onEnd(na<=oAttempts?'win':'lose'),1500);
    } else {
      const h=g<secret?'📈 Too low!':'📉 Too high!';
      setHint(h);
      setChat(prev=>[...prev,{id:Date.now().toString(),user:'System',text:`${g} → ${h}`}]);
      if(na>=10)setTimeout(()=>onEnd('lose'),1000);
    }
    setGuess('');
  };

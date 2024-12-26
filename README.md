# Modern İş Başvuru Formu

Bu proje, modern ve kullanıcı dostu bir iş başvuru formu uygulamasıdır. React ve TailwindCSS kullanılarak geliştirilmiş olup, hem masaüstü hem de mobil cihazlarda sorunsuz çalışacak şekilde tasarlanmıştır.

## Özellikler

- 🎨 Modern ve duyarlı tasarım
- 🌓 Karanlık/Aydınlık mod desteği
- 🌍 Türkçe/İngilizce dil desteği
- ✨ Sayfa geçişlerinde animasyonlar
- 📱 Mobil uyumlu arayüz
- 🔍 Form doğrulama
- 📋 Başvuru özeti sayfası
- 🚀 Toastify bildirimler

## Teknolojiler

- React
- TailwindCSS
- React Router
- React Hook Form
- React Toastify
- Axios
- PropTypes

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/form.git
cd form
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda açın:
```
http://localhost:5173
```

## Kullanım

1. Form alanlarını doldurun:
   - Email (zorunlu)
   - LinkedIn profil linki (zorunlu)
   - Deneyim seviyesi (zorunlu)
   - Pozisyon (zorunlu)
   - İngilizce seviyesi (zorunlu)
   - Proje deneyimi (opsiyonel)
   - Ek bilgiler (opsiyonel)

2. "Başvuruyu Gönder" butonuna tıklayın

3. Başvurunuz başarıyla gönderildiğinde:
   - Başarı bildirimi görüntülenir
   - Animasyonlu geçiş efekti ile başvuru özeti sayfasına yönlendirilirsiniz
   - Başvuru özetinde tüm form bilgilerinizi görebilirsiniz

## Özelleştirme

### Tema Değiştirme
- Sağ üst köşedeki tema değiştirme butonunu kullanarak karanlık/aydınlık mod arasında geçiş yapabilirsiniz
- Tema tercihiniz tarayıcınızda saklanır

### Dil Değiştirme
- Sağ üst köşedeki dil değiştirme butonunu kullanarak Türkçe/İngilizce arasında geçiş yapabilirsiniz
- Dil tercihiniz tarayıcınızda saklanır

## Geliştirme

### Proje Yapısı
```
src/
  ├── components/         # React bileşenleri
  ├── context/           # Context API dosyaları
  ├── translations/      # Dil dosyaları
  ├── App.jsx           # Ana uygulama bileşeni
  └── main.jsx          # Giriş noktası
```

### Bileşenler
- `JobApplicationForm`: Ana form bileşeni
- `SuccessPage`: Başvuru özeti sayfası
- `PageTransition`: Sayfa geçiş animasyonları
- `ThemeToggle`: Tema değiştirme butonu
- `LanguageToggle`: Dil değiştirme butonu

## Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir özellik dalı oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Dalınıza push yapın (`git push origin yeni-ozellik`)
5. Bir Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına bakın.

## İletişim

Sorularınız veya geri bildirimleriniz için lütfen bir Issue oluşturun.

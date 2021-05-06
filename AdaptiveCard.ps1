$URI = 'https://picturematic.webhook.office.com/webhookb2/33312b08-7397-42a1-a4d5-23051612f584@23f17848-a588-4186-a4d7-f56b635f8b14/IncomingWebhook/84e00587db3f4d18ab9ab126d48bee01/3ff8b577-b39a-4eb7-b5da-072225ed4f3a'

$card = Get-Content -Path AdaptiveCard.json -Raw

$JSON = '{
  "type":  "message",
  "attachments":  
  [
      {
          "contentType":  "application/vnd.microsoft.card.adaptive",
          "content":  '
$JSON += $card 
$JSON += '        }
]
}'

$RESTParams = @{
  "URI"         = $URI
  "Method"      = 'POST'
  "Body"        = $JSON
  "ContentType" = 'application/json'
}

Write-Host $JSON
Invoke-RestMethod @RESTParams